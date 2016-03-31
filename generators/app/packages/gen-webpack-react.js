'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
    "react": versions['react'],
    "react-dom": versions['react-dom'],
  });

  assign(pkg, 'devDependencies', {
    "ava": versions['ava'],
    "babel-plugin-transform-runtime": versions['babel-plugin-transform-runtime'],
    "babel-preset-es2015": versions['babel-preset-es2015'],
    "babel-preset-stage-0": versions['babel-preset-stage-0'],
    "babel-preset-react": versions['babel-preset-react'],
    "babel-preset-react-hmre": versions['babel-preset-react-hmre'],
    "webpackman": versions['webpackman']
  });

  assign(pkg, 'scripts', {
    "start": "wserve",
    "build": "rm -rf dist && NODE_ENV=production wbuild --x-vendors=react",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.private = true;
};
