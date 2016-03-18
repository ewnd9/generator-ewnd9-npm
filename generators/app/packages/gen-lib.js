'use strict';

const assign = require('../helpers/assign-object');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
  });

  assign(pkg, 'devDependencies', {
    "ava": "^0.13.0"
  });

  assign(pkg, 'scripts', {
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  pkg.preferGlobal = 'true';
  pkg.main = 'index.js';
};
