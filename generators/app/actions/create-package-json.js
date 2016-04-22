'use strict';

const constants = require('../constants');
const npmconf = require('npmconf');

module.exports = function() {
  return new Promise((resolve, reject) => {
    npmconf.load({ some: 'configs' }, (err, conf) => {
      if (err) {
        console.error('asd', err);
        process.exit(1);
      }

      const pkgData = require('../helpers/gen-package')(this.packageName);

      pkgData.author = conf.get('init-author-name') + ' <' + conf.get('init-author-email') + '>';
      pkgData.license = conf.get('init-license');

      require(`../packages/gen-${this.projectType}`).genPackage(this, pkgData);

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

      resolve();
    });
  });
};
