'use strict';

const assign = require('../helpers/assign-object');
const { reduceDeps } = require('./versions');

module.exports.genPackage = function(base, pkg) {
  assign(pkg, 'dependencies', reduceDeps([
    'meow',
    'update-notifier'
  ]));

  assign(pkg, 'devDependencies', reduceDeps([
    'ava'
  ]));

  assign(pkg, 'scripts', {
    "start": "node cli.js",
    "test": "ava",
    "test:watch": "npm run test -- --watch"
  });

  base.packageInstall = `$ npm install ${base.packageName} --global`;
  base.packageUsage = `$ ${base.packageName}`;

  pkg.bin = 'cli.js';
  pkg.preferGlobal = 'true';
  pkg.main = 'lib/index.js';
  pkg.engines = {
    "node": ">=4.0"
  };
  pkg.files = [
    'cli.js',
    'lib'
  ];
};
