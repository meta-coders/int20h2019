'use strict';

const https = require('https');
const qs = require('querystring');
const API_URL = 'https://api-us.faceplusplus.com/facepp/v3';

const {
  FACEPP_API_KEY,
  FACEPP_SECRET,
  FACEPP_FACESET_TOKEN,
} = process.env;


const createForm = obj => qs.stringify(obj);

const fetch = (method, options) => {
  options = Object.assign({
    api_key: FACEPP_API_KEY,
    api_secret: FACEPP_SECRET,
  }, options);

  const url = API_URL + method;
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
  apiKey: FACEPP_API_KEY,
  apiSecret: FACEPP_SECRET,
  facesetToken: FACEPP_FACESET_TOKEN,
  fetch,
  detect: options => fetch('/detect', options),
};

