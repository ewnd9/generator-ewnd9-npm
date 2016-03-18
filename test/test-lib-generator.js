'use strict';

const path = require('path');
const assert = require('yeoman-generator').assert;
const helpers = require('yeoman-generator').test;
const os = require('os');

const constants = require('../generators/app/constants');

describe('ewnd9:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        packageName: 'YO',
        type: constants.TYPE_LIB
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig'
    ]);

    assert.fileContent('package.json', /"name": "YO"/g);
    assert.fileContent('package.json', /"main": "index.js"/g);
  });
});
