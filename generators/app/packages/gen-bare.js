'use strict';

const assign = require('../helpers/assign-object');
const versions = require('./versions');
const requireLine = require('./require-line');

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

  base.packageInstall = `$ npm install ${base.packageName} --save`;
  base.packageUsage = requireLine(base.packageName);
  base.packageUsageLang = 'js';

  pkg.main = 'index.js';
  pkg.engines = {
    "node": ">=4.0"
  };
  pkg.files = [
    'index.js',
    'lib'
  ];
};
