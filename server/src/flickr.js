'use strict';

const fetch = require('node-fetch');
const qs = require('querystring');

const parseResponse = data => {
  data = data.replace(/jsonFlickrApi\(/, '');
  data = data.slice(0, data.length - 1);
  return JSON.parse(data);
};

const request = async options => {
  options.api_key = config.api.flickr.apiKey;
  const url = config.resources.flickr + qs.stringify(options);
  const response = await fetch(url);
  return parseResponse(await response.text());
};

const getPhotoURL = ({ farm: farmId, server: serverId, secret, id }) =>
  `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

module.exports = {
  request,
  getPhotoURL,
  fetchPhotos: options =>
    request({
      method: 'flickr.photos.search',
      ...options,
    }),
  fetchPhotoset: options =>
    request({
      method: 'flickr.photosets.getPhotos',
      user_id: config.api.flickr.userId,
      photoset_id: config.api.flickr.photosetId,
      ...options,
    }),
};

