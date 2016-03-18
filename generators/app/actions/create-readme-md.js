'use strict';

const constants = require('../constants');

module.exports = function() {
  this.packageInstall = '$ npm install ' + this.packageName;
  this.packageUsage = 'INSERT_USAGE';

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
};