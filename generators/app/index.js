'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

const constants = require('./constants');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    const done = this.async();

    const prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'Package name',
      default: path.basename(process.cwd())
    }, {
      type: 'list',
      name: 'type',
      message: 'Select Type',
      choices: [
        constants.TYPE_LIB,
        constants.TYPE_CLI,
        constants.TYPE_CHROME_EXTENSION
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
      const spawn = require('child_process').spawn;
      const git = spawn('git', ['init']);

      git.on('close', function (code, signal) {
        console.log('child process terminated due to receipt of signal ' + signal);
      });
    },
    app: function () {
      require('./actions/create-package-json').apply(this);
    },
    projectfiles: function () {
      require('./actions/move-files').apply(this);
    }
  }
});
