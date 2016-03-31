'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
  });

  assign(pkg, 'devDependencies', {
    "ava": versions['ava'],
    "babel-cli": versions['babel-cli'],
    "babel-preset-es2015": versions['babel-preset-es2015']
  });

  assign(pkg, 'scripts', {
    "build": "babel -d dist src",
    "build:watch": "babel -w -d dist src",
    "prepublish": "npm run build",
    "postpublish": "rm -rf dist",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install --save ${base.packageName}';
  base.packageUsage = '$ npm start';

  pkg.preferGlobal = 'true';
  pkg.main = 'dist/index.js';
};
