'use strict';

const assign = require('../helpers/assign-object');
const requireLine = require('./require-line');
const { reduceDeps } = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {});

  assign(pkg, 'devDependencies', reduceDeps([
    'ava',
    'babel-cli',
    'babel-core',
    'babel-preset-es2015'
  ]));

  assign(pkg, 'scripts', {
    "build": "babel -d dist src",
    "build:watch": "babel -w -d dist src",
    "prepublish": "npm run build",
    "postpublish": "rm -rf dist",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = `$ npm install ${base.packageName} --save`;
  base.packageUsage = requireLine(base.packageName);
  base.packageUsageLang = 'js';

  pkg.main = 'dist/index.js';
  pkg.files = [
    'dist'
  ];
};
