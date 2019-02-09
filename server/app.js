'use strict';

const express = require('express');
const loadConfig = require('./src/loadConfig');
const loadPhotos = require('./src/loadPhotos');
const { connect } = require('./src/db');

const app = express();

console.info('Running server setup:');
console.info('Loading config');

loadConfig();

loadPhotos()
  .then(() => {
    console.info('Successfully setup.');
    app.listen(config.server, () => console.info('Server started.'));
  })
  .catch(e => console.error('Setup failed\n', e));

app.get('/photos', async (req, res) => {
  const db = await connect();
  const photos = await db
    .collection('Images')
    .find({})
    .toArray();
  res.json({ photos });
});
