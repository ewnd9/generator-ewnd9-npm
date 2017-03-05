'use strict';

const versions = module.exports = {
  "ava": "^0.17.0",
  "babel-cli": "~6.14.0",
  "babel-core": "~6.14.0",
  "babel-preset-es2015": "~6.14.0",
  "babel-preset-stage-0": "~6.5.0",
  "babel-plugin-transform-es2015-modules-commonjs": "^6.14.0",
  "babel-plugin-transform-runtime": "~6.12.0",
  "babel-preset-react": "~6.11.0",
  "babel-preset-react-hmre": "~1.1.1",
  "babel-runtime": "^6.6.1",
  "electron-prebuilt": "^1.3.4",
  "koa": "^2.0.0",
  "koa-bodyparser": "^3.0.0",
  "koa-compress": "^2.0.0",
  "koa-convert": "^1.2.0",
  "koa-router": "^7.0.1",
  "koa-static": "^3.0.0",
  "meow": "^3.7.0",
  "react": "^0.14.7",
  "react-dom": "^0.14.7",
  "source-map-support": "^0.4.0",
  "supertest": "^1.2.0",
  "update-notifier": "^0.6.0",
  "webpack-target-electron-renderer": "^0.4.0",
  "webpackman": "^0.7.0"
};

module.exports.reduceDeps = xs => xs.reduce((total, curr) => {
  total[curr] = versions[curr];
  return total;
}, {});
