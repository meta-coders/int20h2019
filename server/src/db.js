'use strict';

const { MongoClient } = require('mongodb');

const connect = () =>
  new Promise((resolve, reject) =>
    MongoClient.connect(
      config.database.url,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject(err);
        } else {
          const db = client.db(config.database.name);
          db.close = () => client.close();
          resolve(db);
        }
      }
    )
  );

module.exports = { connect };
