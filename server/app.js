'use strict';

const express = require('express');
const loadPhotos = require('./src/loadPhotos');

global.config = require('./config');

const app = express();

console.info('Running server setup:');
loadPhotos()
  .then(() => {
    console.info('Successfully setup.');
    app.listen(config.server, () => console.info('Server started.'));
  })
  .catch(e => console.error('Setup failed\n', e));

