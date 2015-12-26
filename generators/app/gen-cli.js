var assign = require('object-assign');

module.exports.genPackage = function(base, pkgDeps, pkgDevDeps, pkgScripts, misc) {
  assign(pkgDeps, {
    "babel": "^5.8.21",
    "update-notifier": "^0.5.0"
  });
  assign(pkgDevDeps, {
    "ava": "^0.8.0",
    "nodemon": "^1.8.1"
  });
  assign(pkgScripts, {
    "start": "node cli.js",
    "test": "ava",
    "test:watch": "nodemon test/*.js --exec ava"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  misc.bin = 'cli.js';
  misc.preferGlobal = 'true';
  misc.main = 'lib/index.js';
};
