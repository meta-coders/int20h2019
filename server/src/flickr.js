"use strict";

const https = require("https");
const qs = require("querystring");

const parseResponse = data => {
  data = data.replace(/jsonFlickrApi\(/, "");
  data = data.slice(0, data.length - 1);
  return JSON.parse(data);
};

const fetch = options => {
  options.api_key = config.api.flickr.apiKey;

  const url = config.resources.flickr + qs.stringify(options);

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => {
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
  fetchPhotos: options => fetch({ method: "flickr.photos.search", ...options }),
  fetchPhotoset: options =>
    fetch({
      method: "flickr.photosets.getPhotos",
      user_id: config.api.flickr.userId,
      photoset_id: config.api.flickr.photosetId,
      ...options
    })
};
