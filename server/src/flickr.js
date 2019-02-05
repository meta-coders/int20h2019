'use strict';

const https = require('https');
const qs = require('querystring');
const API_URL = 'https://api.flickr.com/services/rest/?format=json&';

const {
  FLICKR_API_KEY,
  FLICKR_USER_ID,
  FLICKR_PHOTOSET_ID,
} = process.env;

const parseResponse = data => {
  data = data.replace(/jsonFlickrApi\(/, '');
  data = data.slice(0, data.length - 1);
  return JSON.parse(data);
};

const fetch = options => {
  options.api_key = FLICKR_API_KEY;

  const url = API_URL + qs.stringify(options);

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const data = Buffer.concat(chunks).toString();
        try {
          resolve(parseResponse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
  });
};

const getPhotoURL = ({ farm: farmId, server: serverId, secret, id }) =>
  `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

module.exports = {
  fetch,
  getPhotoURL,
  apiKey: FLICKR_API_KEY,
  userId: FLICKR_USER_ID,
  photosetId: FLICKR_PHOTOSET_ID,
  fetchPhotos: options => fetch({ method: 'flickr.photos.search', ...options }),
  fetchPhotoset: () => fetch({
    method: 'flickr.photosets.getPhotos',
    user_id: FLICKR_USER_ID,
    photoset_id: FLICKR_PHOTOSET_ID,
  }),
};
