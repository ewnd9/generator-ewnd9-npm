var assign = require('object-assign');

module.exports.genPackage = function(base, pkgDeps, pkgDevDeps, pkgScripts, misc) {
  assign(pkgDeps, {
  });
  assign(pkgDevDeps, {
    "babel": "^5.8.21",
    "chai": "^3.2.0",
    "mocha": "^2.2.5"
  });
  assign(pkgScripts, {
    "start": "node cli.js",
    "test": "mocha --require babel/register",
    "test:watch": "mocha -w --require babel/register",
    "prebuild": "rm -rf dist && mkdir dist",
    "build": "babel -d dist/ src/",
    "prepublish": "npm run build"
  });

  base.packageInstall = '$ npm install';
  base.packageUsage = '$ npm start';

  misc.preferGlobal = 'false';
  misc.main = 'dist/index.js';
};
