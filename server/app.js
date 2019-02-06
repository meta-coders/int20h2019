"use strict";

const express = require("express");
const loadPhotos = require("./src/loadPhotos");
const { connect } = require("./src/db");

global.config = require("./config");

const app = express();

console.info("Running server setup:");
loadPhotos()
  .then(() => {
    console.info("Successfully setup.");
    app.listen(config.server, () => console.info("Server started."));
  })
  .catch(e => console.error("Setup failed\n", e));

app.get("/photos", async (req, res) => {
  const db = await connect();
  const photos = await db
    .collection("Images")
    .find({})
    .toArray();
  res.json({ photos });
});
