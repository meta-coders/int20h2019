'use strict';

const { Client } = require('pg');

const setupTable = `
CREATE TABLE IF NOT EXISTS "Images" (
	image_id TEXT PRIMARY KEY,
	url TEXT,
	emotions JSON
)`;

const connect = async () => {
	const client = new Client({
		connectionString: config.databaseUrl,
	});

  await client.connect();
	await client.query(setupTable);

  return client;
};

module.exports = { connect };
