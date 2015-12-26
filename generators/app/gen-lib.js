var assign = require('object-assign');

module.exports.genPackage = function(base, pkgDeps, pkgDevDeps, pkgScripts, misc) {
  assign(pkgDeps, {
  });
  assign(pkgDevDeps, {
    "ava": "^0.8.0",
    "babel": "^5.8.21",
    "nodemon": "^1.8.1"
  });
  assign(pkgScripts, {
    "start": "node cli.js",
    "test": "ava",
    "test:watch": "nodemon test/*.js --exec ava",
    "prebuild": "rm -rf dist && mkdir dist",
    "build": "babel -d dist/ src/",
    "prepublish": "npm run build"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  misc.preferGlobal = 'false';
  misc.main = 'dist/index.js';
};
