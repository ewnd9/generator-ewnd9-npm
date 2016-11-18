'use strict';

const assign = require('../helpers/assign-object');
const { reduceDeps } = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', reduceDeps([
    'react',
    'react-dom'
  ]));

  assign(pkg, 'devDependencies', reduceDeps([
    'ava',
    'babel-plugin-transform-runtime',
    'babel-preset-es2015',
    'babel-preset-stage-0',
    'babel-preset-react',
    'babel-preset-react-hmre',
    'webpackman',
  ]));

  assign(pkg, 'scripts', {
    "start": "webpack-dev-server",
    "build": "rm -rf dist && NODE_ENV=production webpack --config webpack.config.prod.js",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.private = true;
};
