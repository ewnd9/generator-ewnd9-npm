'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
  });

  assign(pkg, 'devDependencies', {
    "ava": versions['ava']
  });

  assign(pkg, 'scripts', {
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install --save ${base.packageName}';
  base.packageUsage = '$ npm start';

  pkg.main = 'index.js';
  pkg.engines = {
    "node": ">=4.0"
  };
};
