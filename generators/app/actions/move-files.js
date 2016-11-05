'use strict';

const constants = require('../constants');
const generateFavicon = require('../helpers/gen-favicon');

module.exports = function() {
  const cp = function(tpl, dest) {
    this.fs.copy(this.templatePath(tpl), this.destinationPath(dest));
  }.bind(this);

  const template = function(tpl, dest) {
    this.template(this.templatePath(tpl), this.destinationPath(dest));
  }.bind(this);

  cp('editorconfig', '.editorconfig');
  cp('gitignore', '.gitignore');
  cp('license', 'license');

  if (this.projectType === constants.TYPE_BARE) {
    cp('travis-gt-4.yml', '.travis.yml');

    cp('lib/index.js', 'index.js');
    cp('lib/test.js', 'test.js');
  } else if (this.projectType === constants.TYPE_LIB) {
    cp('travis.yml', '.travis.yml');

    cp('lib/index.js', 'src/index.js');
    cp('lib/test.js', 'test/test.js');
    cp('babelrc-node', '.babelrc');
  } else if (this.projectType === constants.TYPE_CLI) {
    cp('travis-gt-4.yml', '.travis.yml');
    cp('cli/cli.js', 'cli.js');
    cp('cli/index.js', 'lib/index.js');
    cp('cli/test.js', 'test/test.js');
  } else if (this.projectType === constants.TYPE_WEBPACK_REACT) {
    cp('travis.yml', '.travis.yml');
    cp('webpack-react/babelrc-webpack', '.babelrc');
    cp('webpack-react/webpack.config.js', 'webpack.config.js');
    cp('webpack-react/webpack.config.prod.js', 'webpack.config.prod.js');

    cp('webpack-react/index.js', 'src/index.js');
    cp('webpack-react/index.html', 'src/index.html');
    cp('webpack-react/style.css', 'src/style.css');
    cp('webpack-react/variables.css', 'src/variables.css');

    cp('webpack-react/component-main/main.js', 'src/components/main/main.js');
    cp('webpack-react/component-main/style.css', 'src/components/main/style.css');

    cp('webpack-react/test.js', 'test/test.js');

    this.fs.copy(generateFavicon(), this.destinationPath('src/favicon.ico'));
  } else if (this.projectType === constants.TYPE_KOA) {
    cp('travis-gt-4.yml', '.travis.yml');
    cp('babelrc-node-runtime', '.babelrc');

    cp('koa/index.js', 'index.js');
    cp('koa/src/app.js', 'src/app.js');

    cp('koa/test/test.js', 'test/test.js');
  } else if (this.projectType === constants.TYPE_CHROME_EXTENSION) {
    cp('travis.yml', '.travis.yml');

    cp('chrome-extension/index.js', 'src/index.js');
    cp('chrome-extension/background.js', 'src/background.js');
    cp('chrome-extension/options.js', 'src/options.js');
  } else if (this.projectType === constants.TYPE_ELECTRON) {
    cp('travis-gt-4.yml', '.travis.yml');
    cp('babelrc-electron', '.babelrc');

    cp('electron/frontend/index.js', 'frontend/index.js');
    cp('electron/lib/index.js', 'lib/index.js');
    template('electron/public/_index.html', 'public/index.html');
    template('electron/public/_index-dev.html', 'public/index-dev.html');

    cp('electron/webpack.config.js', 'webpack.config.js');
  }
};
