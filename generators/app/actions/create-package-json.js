'use strict';

const constants = require('../constants');

module.exports = function() {
  this.packageInstall = '$ npm install ' + this.packageName;
  this.packageUsage = 'INSERT_USAGE';

  const done = this.async();
  const npmconf = require('npmconf')

  npmconf.load({ some:'configs' }, function (err, conf) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const pkgData = require('../helpers/gen-package')(this.packageName);

    pkgData.author = conf.get('init-author-name') + ' <' + conf.get('init-author-email') + '>';
    pkgData.license = conf.get('init-license');

    if (this.projectType === constants.TYPE_LIB) {
      require('../packages/gen-lib').genPackage(this, pkgData);
    } else if (this.projectType === constants.TYPE_CLI) {
      require('../packages/gen-cli').genPackage(this, pkgData);
    }

    const params = [
      'name',
      'description',
      'version',
      'main',
      'bin',
      'dependencies',
      'devDependencies'
    ];

    const resultObject = require('../helpers/privileged-sorted-object')(pkgData, params);
    require('fs').writeFileSync(this.destinationPath('package.json'), JSON.stringify(resultObject, null, 2), 'utf-8');

    if (this.projectType === constants.TYPE_CHROME_EXTENSION) {
      this.template('chrome-extension/_manifest.json', 'src/manifest.json');

      this.packageInstall = [
        '- Clone repository',
        '- Open chrome://extensions',
        '- Click "Load unpacked extension..."',
        '- Select src folder'
      ].join('\n');
      this.packageUsage = 'As is';

      this.template('_readme.md', 'README.md');
      this.template('chrome-extension/_options.html', 'src/options.html');
    } else {
      this.packageInstall = [
        '```',
        this.packageInstall,
        '```'
      ].join('\n');

      this.packageUsage = [
        '```',
        this.packageUsage,
        '```'
      ].join('\n');

      this.template('_readme.md', 'README.md');
    }

    done();
  }.bind(this));
}
