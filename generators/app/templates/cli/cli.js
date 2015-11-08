#!/usr/bin/env node

var updateNotifier = require('update-notifier');
var pkg = require('./package.json');
updateNotifier({pkg: pkg}).notify();

require('babel/register')({ only: __dirname + '/src' });
require('./src/index');
