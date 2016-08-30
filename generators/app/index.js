'use strict';

const yeoman = require('yeoman-generator');
const path = require('path');

const constants = require('./constants');
const log = console.log.bind(console);

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    const done = this.async();

    if (process.env.PACKAGE_NAME && process.env.PACKAGE_TYPE) {
      this.packageName = process.env.PACKAGE_NAME;
      this.projectType = process.env.PACKAGE_TYPE;

      log(`name: ${this.packageName}\ntype: ${this.projectType}`);
      done();
    } else {
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
          constants.TYPE_BARE,
          constants.TYPE_LIB,
          constants.TYPE_CLI,
          constants.TYPE_WEBPACK_REACT,
          constants.TYPE_CHROME_EXTENSION,
          constants.TYPE_ELECTRON,
          constants.TYPE_KOA
        ]
      }];

      this.prompt(prompts, function (props) {
        this.props = props;

        this.packageName = props.packageName;
        this.projectType = props.type;

        done();
      }.bind(this));
    }
  },
  writing: {
    app: function () {
      const done = this.async();

      require('./actions/create-package-json').call(this)
        .then(() => require('./actions/create-readme-md').call(this))
        .then(() => done());
    },
    projectfiles: function () {
      require('./actions/move-files').apply(this);
    }
  }
});
