"use strict";

const promisify = fn => (...args) =>
  new Promise((res, rej) =>
    fn(...args, (err, ...result) => {
      if (err) rej(err);
      else res(...result);
    })
  );

module.exports = {
  promisify
};
