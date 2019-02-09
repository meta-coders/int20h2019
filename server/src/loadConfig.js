'use strict';

const loadConfig = () => {
	global.config = require('../config');

	const {
		FLICKR_API_KEY,
		FACEPP_API_KEY,
		FACEPP_SECRET,
	} = process.env;

	Object.assign(config.api.flickr, {
		apiKey: FLICKR_API_KEY,
	});

	Object.assign(config.api.facepp, {
		apiKey: FACEPP_API_KEY,
		secret: FACEPP_SECRET,
	});
};

module.exports = loadConfig;