'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', {
    "meow": versions['meow'],
    "update-notifier": versions['update-notifier']
  });

  assign(pkg, 'devDependencies', {
    "ava": versions['ava']
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
  pkg.engines = {
    "node": ">=4.0"
  };
};
