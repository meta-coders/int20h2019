'use strict';

const { MongoClient } = require('mongodb');

const config = require('../config');

const connect = async () => {
  const client = await MongoClient.connect(
    config.database.url,
    { useNewUrlParser: true }
  );

  const db = client.db(config.database.name);
  db.close = () => client.close();
  return db;
};

module.exports = { connect };
