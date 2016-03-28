'use strict';

const assign = require('../helpers/assign-object');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
  });

  assign(pkg, 'devDependencies', {
    "ava": "^0.13.0",
    "babel-cli": "~6.6.0",
    "babel-preset-es2015": "~6.6.0"
  });

  assign(pkg, 'scripts', {
    "build": "babel -d dist src",
    "build:watch": "babel -w -d dist src",
    "prepublish": "npm run build",
    "postpublish": "rm -rf dist",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.preferGlobal = 'true';
  pkg.main = 'dist/index.js';
};
