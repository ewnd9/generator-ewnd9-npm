'use strict';

const assign = require('../helpers/assign-object');
const { reduceDeps } = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', reduceDeps([
    'babel-runtime',
    'koa',
    'koa-bodyparser',
    'koa-compress',
    'koa-convert',
    'koa-router',
    'koa-static'
  ]));

  assign(pkg, 'devDependencies', reduceDeps([
    'ava',
    'babel-cli',
    'babel-plugin-transform-runtime',
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'source-map-support',
    'supertest'
  ]));

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
