'use strict';

const sortedObject = require('sorted-object');

module.exports = function(pkg, privileged) {
  const sorted = sortedObject(pkg);
  const sortedKeys = Object.keys(sorted);
  const result = {};

  privileged.filter(_ => sortedKeys.indexOf(_) > -1).forEach(key => {
    result[key] = sorted[key];
  });

  Object.keys(sorted).filter(_ => privileged.indexOf(_) === -1).forEach(key => {
    result[key] = sorted[key];
  });

  console.log(sorted, result);

  return result;
};
