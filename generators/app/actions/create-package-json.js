'use strict';

const constants = require('../constants');
const npmconf = require('npmconf');

module.exports = function(done) {
  npmconf.load({ some:'configs' }, function (err, conf) {
    if (err) {
      console.error('asd', err);
      process.exit(1);
    }

    const pkgData = require('../helpers/gen-package')(this.packageName);

    pkgData.author = conf.get('init-author-name') + ' <' + conf.get('init-author-email') + '>';
    pkgData.license = conf.get('init-license');

    if (this.projectType === constants.TYPE_BARE) {
      require('../packages/gen-bare').genPackage(this, pkgData);
    } else if (this.projectType === constants.TYPE_LIB) {
      require('../packages/gen-lib').genPackage(this, pkgData);
    } else if (this.projectType === constants.TYPE_CLI) {
      require('../packages/gen-cli').genPackage(this, pkgData);
    } else if (this.projectType === constants.TYPE_WEBPACK_REACT) {
      require('../packages/gen-webpack-react').genPackage(this, pkgData);
    } else if (this.projectType === constants.TYPE_KOA) {
      require('../packages/gen-koa').genPackage(this, pkgData);
    }

    const params = [
      'name',
      'description',
      'version',
      'main',
      'bin',
      'scripts',
      'engines',
      'keywords',
      'dependencies',
      'devDependencies'
    ];

    const resultObject = require('../helpers/privileged-sorted-object')(pkgData, params);

    const dest = this.destinationPath('package.json');
    this.fs.writeJSON(dest, resultObject);

    done();
  }.bind(this));
};
