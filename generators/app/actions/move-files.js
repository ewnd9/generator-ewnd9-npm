'use strict';

const constants = require('../constants');

module.exports = function() {
  const cp = function(tpl, dest) {
    this.fs.copy(this.templatePath(tpl), this.destinationPath(dest));
  }.bind(this);

  cp('editorconfig', '.editorconfig');
  cp('gitignore', '.gitignore');
  cp('npmignore', '.npmignore');
  cp('travis.yml', '.travis.yml');

  if (this.projectType === constants.TYPE_LIB) {
    cp('lib/index.js', 'src/index.js');
    cp('cli/simple-spec.js', 'test/index-spec.js');
    cp('babelrc-node', '.babelrc');
  } else if (this.projectType === constants.TYPE_CLI) {
    cp('cli/cli.js', 'cli.js');
    cp('cli/index.js', 'src/index.js');
    cp('cli/simple-spec.js', 'test/index-spec.js');
  } else if (this.projectType === constants.TYPE_CHROME_EXTENSION) {
    cp('chrome-extension/index.js', 'src/index.js');
    cp('chrome-extension/background.js', 'src/background.js');
    cp('chrome-extension/options.js', 'src/options.js');
  }
};
