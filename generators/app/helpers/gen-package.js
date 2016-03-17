'use strict';

module.exports = function(packageName) {
  const result = {};

  result.name = packageName;
  result.version = '0.0.0';
  result.description = '';
  result.main = 'index.js';

  result.scripts = {
    test: 'echo \"Error: no test specified\" && exit 1'
  };

  result.repository = {
    type: 'git',
    url: 'git+https://github.com/ewnd9/' + packageName + '.git'
  };

  result.keywords = [''];

  result.dependencies = {};
  result.devDependencies = {};

  return result;
};
