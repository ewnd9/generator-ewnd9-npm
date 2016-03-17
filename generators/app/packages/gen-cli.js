'use strict';

const assign = require('../helpers/assign-object');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
    "meow": "^3.7.0",
    "update-notifier": "^0.6.0"
  });

  assign(pkg, 'devDependencies', {
    "ava": "^0.13.0"
  });

  assign(pkg, 'scripts', {
    "start": "node cli.js",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = `$ npm install -g ${base.packageName}`;
  base.packageUsage = `$ ${base.packageName}`;

  pkg.bin = 'cli.js';
  pkg.preferGlobal = 'true';
  pkg.main = 'lib/index.js';
};
