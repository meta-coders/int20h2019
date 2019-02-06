'use strict';

const https = require('https');
const qs = require('querystring');

const createForm = obj => qs.stringify(obj);

const fetch = (method, options) => {
  options = Object.assign({
    api_key: config.api.facepp.apiKey,
    api_secret: config.api.facepp.secret,
  }, options);

  const url = config.resources.facepp + method;
  const formData = createForm(options);
  const req = https.request(url, { method: 'POST' });
  req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.setHeader('Content-Length', formData.length);
  req.write(formData);
  req.end();

  return new Promise((resolve, reject) => {
    req.on('response', res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const data = Buffer.concat(chunks).toString();
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      })
    });
  });
};

module.exports = {
  fetch,
  detect: options => fetch('/detect', options),
};

