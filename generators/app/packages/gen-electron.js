'use strict';

const assign = require('../helpers/assign-object');
const { reduceDeps } = require('./versions');

module.exports.genPackage = function(base, pkg) {

  assign(pkg, 'dependencies', reduceDeps([
    'electron-prebuilt',
    'babel-runtime'
  ]));

  assign(pkg, 'devDependencies', reduceDeps([
    'ava',
    'babel-plugin-transform-runtime',
    'babel-plugin-transform-es2015-modules-commonjs',
    'babel-preset-react',
    'babel-preset-react-hmre',
    'webpack-target-electron-renderer',
    'webpackman'
  ]));

  assign(pkg, 'scripts', {
    "start": "NODE_ENV=development electron ./lib/index.js",
    "build:frontend": "NODE_ENV=production webpack",
    "build:frontend:watch": "webpack-dev-server",
    "prepublish": "npm run build:frontend",
    "postpublish": "rm -rf dist",
    "test": "ava --serial",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.main = 'index.js';
};
