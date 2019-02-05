'use strict';

const { MongoClient } = require('mongodb');
const URL = 'mongodb://localhost:27017';
const DB = 'int20h2019-test';

const connect = () => new Promise((resolve, reject) =>
  MongoClient.connect(URL, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      reject(err);
    } else {
      const db = client.db(DB);
      db.close = () => client.close();
      resolve(db);
    }
  })
);

module.exports = { connect };
