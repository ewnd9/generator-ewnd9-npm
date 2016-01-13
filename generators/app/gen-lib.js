var assign = require('object-assign');

module.exports.genPackage = function(base, pkgDeps, pkgDevDeps, pkgScripts, misc) {
  assign(pkgDeps, {
  });
  assign(pkgDevDeps, {
    "ava": "^0.8.0",
    "babel-cli": "^6.4.0",
    "babel-core": "^6.4.0",
    "babel-plugin-lodash": "^1.1.0",
    "babel-preset-es2015": "^6.3.13",
    "nodemon": "^1.8.1"
  });
  assign(pkgScripts, {
    "start": "node cli.js",
    "test": "ava",
    "test:watch": "nodemon --exec ava",
    "prebuild": "rm -rf dist && mkdir dist",
    "build": "babel -d dist/ src/",
    "prepublish": "npm run build"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  misc.preferGlobal = 'false';
  misc.main = 'dist/index.js';
};
