'use strict';

const { connect } = require('./db');
const flickr = require('./flickr');
const facepp = require('./facepp');

const fetchPages = async (key, fetcher, options) => {
  const result = await fetcher(options);
  if (result.stat === 'fail') throw result.message;

  const results = [result[key]];
  const more = result[key].page < result[key].pages;

  if (!more) return results;

  for (let i = 2; i <= result[key].pages; ++i) {
    const result = await fetcher({ page: i, ...options });
    if (result.stat === 'fail') throw result.message;
    results.push(result[key]);
  }

  return results;
};

const fetchPhotoset = async () => {
  const photoset = await fetchPages('photoset', flickr.fetchPhotoset);
  return [].concat(...photoset.map(part => part.photo));
};

const fetchTagged = async () => {
  const tagged = await fetchPages('photos', flickr.fetchPhotos, config.flickr);
  return [].concat(...tagged.map(part => part.photo));
};

const photos = async () => {
  console.info('Fetching images from Flickr API...');

  const photoset = await fetchPhotoset();
  const tagged = await fetchTagged();

  const ids = new Set();
  const photos = [];

  photoset.forEach(img => (ids.add(img.id), photos.push(img)));
  tagged.forEach(img => {
    if (!ids.has(img.id)) photos.push(img);
  });

  console.info(`Got ${photos.length} images.`);
  return photos;
};

const getEmotions = faces => {
  const emotions = new Set();

  faces.forEach(face => {
    if (!face.attributes) return;
    const faceEmotions = face.attributes.emotion;
    Object.keys(faceEmotions).forEach(name => {
      const value = faceEmotions[name];
      if (value > config.facepp.minEmotionPercentage) emotions.add(name);
    });
  });

  return Array.from(emotions);
};

const split = (photos, limit) => {
  const result = [];
  while (photos.length) {
    result.push(photos.slice(0, limit));
    photos = photos.slice(limit);
  }
  return result;
};

const detectPhoto = photo =>
  new Promise((resolve, reject) => {
    let timedout = false;
    const timeout = setTimeout(() => {
      console.info('Request timeout.');
      timedout = true;
      resolve();
    }, config.api.facepp.requestTimeout);

    facepp
      .detect({ image_url: photo.url, return_attributes: 'emotion' })
      .then(detected => {
        if (timedout) return;
        clearTimeout(timeout);
        if (detected.error_message) throw detected.error_message;
        photo.emotions = getEmotions(detected.faces);
        console.count('Detected');
        resolve();
      })
      .catch(e => {
        if (!timedout) {
          clearTimeout(timeout);
          reject(e);
        }
      });
  });

const detectPhotos = async photos => {
  console.info(
    `Detecting photos with Face++ API. This can take a few minutes.
Photos to detect: ${photos.length}`
  );

  const slices = split(photos, config.api.facepp.concurrentLimit);

  for (const slice of slices) {
    await Promise.all(slice.map(detectPhoto));
  }

  console.info('All photos successfully detected');
};

const loadPhotos = async () => {
  const db = await connect();

  const { rows: savedPhotos } = await db.query('SELECT * FROM "Images"');
  const loadedPhotos = await photos();

  const photosToSave = loadedPhotos
    .filter(({ id }) => !savedPhotos.some(img => img.image_id === id))
    .map(p => ({ id: p.id, url: flickr.getPhotoURL(p) }));

  if (photosToSave.length === 0) {
    console.info(`Nothing to save.`);
    db.end();
    return;
  }

  try {
    await detectPhotos(photosToSave);
  } catch (e) {
    console.error(e);
  } finally {
    const detected = photosToSave.filter(p => !!p.emotions);
    const queries = detected.map(({ id, url, emotions }) => db.query(
      'INSERT INTO "Images" VALUES ($1, $2, $3)',
      [id, url, JSON.stringify(emotions)]
    ));
    await Promise.all(queries);
    console.info(`Saved ${detected.length} images.`);
    db.end();
  }
};

module.exports = loadPhotos;
