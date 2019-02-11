'use strict';

const express = require('express');
const loadConfig = require('./src/loadConfig');
const loadPhotos = require('./src/loadPhotos');

const path = require('path');

const { connect } = require('./src/db');

const app = express();

console.info('Running server setup:');
console.info('Loading config');

loadConfig();

loadPhotos()
  .then(() => {
    console.info('Successfully setup.');
    app.listen(config.port, '0.0.0.0', () => console.info('Server started.'));
  })
  .catch(e => console.error('Setup failed\n', e));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('static'));
app.use(express.static('../front/build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/../front/build/index.html'));
});

app.get('/photos', async (req, res) => {
  const db = await connect();
  const { rows: photos } = await db.query('SELECT * FROM "Images"');
  db.end();
  res.json({ photos });
});
