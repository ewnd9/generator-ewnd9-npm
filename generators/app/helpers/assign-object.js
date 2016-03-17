'use strict';

const sortedObject = require('sorted-object');
const assign = require('object-assign');

module.exports = function(pkg, field, dependencies) {
  pkg[field] = assign(pkg[field], dependencies);
};
