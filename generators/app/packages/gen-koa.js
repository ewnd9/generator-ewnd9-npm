'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
    "babel-runtime": versions['babel-runtime'],
    "koa": versions['koa'],
    "koa-bodyparser": versions['koa-bodyparser'],
    "koa-compress": versions['koa-compress'],
    "koa-convert": versions['koa-convert'],
    "koa-router": versions['koa-router'],
    "koa-static": versions['koa-static']
  });

  assign(pkg, 'devDependencies', {
    "ava": versions['ava'],
    "babel-cli": versions['babel-cli'],
    "babel-plugin-transform-runtime": versions['babel-plugin-transform-runtime'],
    "babel-preset-es2015": versions['babel-preset-es2015'],
    "babel-preset-stage-0": versions['babel-preset-stage-0'],
    "source-map-support": versions['source-map-support'],
    "supertest": versions['supertest']
  });

  assign(pkg, 'scripts', {
    "start": "node index",
    "build": "babel -s -d dist src",
    "build:watch": "babel -s -w -d dist src",
    "prepublish": "npm run build",
    "postpublish": "rm -rf dist",
    "test": "ava --serial",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.main = 'index.js';
};
