'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var TYPE_WEBPACK = 'webpack-dev-server';
var TYPE_EXPRESS = 'express';
var TYPE_CLI = 'cli';
var TYPE_LIB = 'lib';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the top-notch ' + chalk.red('Ewnd9') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'Insert package name',
      default: path.basename(process.cwd())
    }, {
      type: 'list',
      name: 'type',
      message: 'Select Type',
      choices: [
        TYPE_LIB, TYPE_WEBPACK, TYPE_EXPRESS, TYPE_CLI
      ]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.packageName = props.packageName;
      this.projectType = props.type;

      done();
    }.bind(this));
  },
  writing: {
    git: function () {
      var spawn = require('child_process').spawn;
      var git = spawn('git', ['init']);

      git.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal ' + signal);
      });
    },
    app: function () {
      var pkgPath = this.destinationPath('package.json');
      var pkgDeps = {};
      var pkgDevDeps = {};
      var pkgScripts = {};
      var misc = {};

      this.packageInstall = '$ npm install ' + this.packageName;
      this.packageUsage = 'INSERT_USAGE';

      if (this.projectType === TYPE_LIB) {
        require('./gen-lib').genPackage(this, pkgDeps, pkgDevDeps, pkgScripts, misc);
      } else if (this.projectType === TYPE_WEBPACK) {
        require('./gen-webpack-dev-server').genPackage(this, pkgDeps, pkgDevDeps, pkgScripts);
      } else if (this.projectType === TYPE_EXPRESS) {
        require('./gen-express').genPackage(this, pkgDeps, pkgDevDeps, pkgScripts);
      } else if (this.projectType === TYPE_CLI) {
        require('./gen-cli').genPackage(this, pkgDeps, pkgDevDeps, pkgScripts, misc);
      }

      var done = this.async();
      var npmconf = require('npmconf')

      npmconf.load({some:'configs'}, function (err, conf) {
        if (err) {
          console.error(err);
        }

        var pkgData = require('./gen-package')(this.packageName, pkgDeps, pkgDevDeps, pkgScripts, misc, conf);
        require('fs').writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2), 'utf-8');

        this.template('_readme.md', 'README.md');
        done();
      }.bind(this));
    },
    projectfiles: function () {
      var cp = function(tpl, dest) {
        this.fs.copy(this.templatePath(tpl), this.destinationPath(dest));
      }.bind(this);

      cp('editorconfig', '.editorconfig');
      cp('gitignore', '.gitignore');
      cp('npmignore', '.npmignore');
      cp('travis.yml', '.travis.yml');

      if (this.projectType === TYPE_LIB) {
        cp('lib/index.js', 'src/index.js');
        cp('cli/simple-spec.js', 'test/index-spec.js');
      } else if (this.projectType === TYPE_WEBPACK) {
        cp('webpack-dev-server/webpack.config.js', 'webpack.config.js');
        cp('webpack-dev-server/app.js', 'src/js/app.js');
        cp('webpack-dev-server/style.scss', 'src/scss/style.scss');
        cp('webpack-dev-server/index.html', 'src/index.html');
      } else if (this.projectType === TYPE_EXPRESS) {
        cp('express/app.js', 'app.js');
        cp('express/index.html', 'public/index.html');
        cp('express/robots.txt', 'public/robots.txt');
        cp('express/server.js', 'src/server.js');
        cp('express/spec.js', 'test/spec.js');
      } else if (this.projectType === TYPE_CLI) {
        cp('cli/cli.js', 'cli.js');
        cp('cli/index.js', 'src/index.js');
        cp('cli/simple-spec.js', 'test/index-spec.js');
      }
    }
  },

  install: function () {
    this.installDependencies();
  }
});
