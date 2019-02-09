'use strict';

const fetch = require('node-fetch');
const qs = require('querystring');

const request = async (method, options) => {
  options = Object.assign(
    {
      api_key: config.api.facepp.apiKey,
      api_secret: config.api.facepp.secret,
    },
    options
  );

  const url = config.resources.facepp + method;
  const body = qs.stringify(options);
  const reqOps = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  };
  const res = await fetch(url, reqOps);
  return res.json();
};

module.exports = {
  request,
  detect: options => request('/detect', options),
};
