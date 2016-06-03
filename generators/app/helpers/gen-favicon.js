'use strict';

const execFileSync = require('child_process').execSync;

module.exports = function() {
  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  const color = Math.floor(Math.random() * 16777215).toString(16);
  const path = `/tmp/${color}.ico`;

  execFileSync(`convert -size 16x16 xc:"#${color}" ${path}`);
  
  return path;
};
