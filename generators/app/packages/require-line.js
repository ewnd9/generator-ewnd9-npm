'use strict';

const camelCase = require('lodash/camelCase');
module.exports = pkg => `const ${camelCase(pkg)} = require('${pkg}');`;
