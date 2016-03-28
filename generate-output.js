#!/usr/bin/env node

'use strict';

const types = require('./generators/app/constants');
const execSync = require('child_process').execSync; // not sure about concurrent npm install, so sync for now

Object
  .keys(types)
  .forEach(type => {
    const dir = `${__dirname}/output/${types[type]}`;
    const env = JSON.parse(JSON.stringify(process.env));

    env.PACKAGE_NAME = types[type];
    env.PACKAGE_TYPE = types[type];

    execSync(`rm -rf ${dir} && mkdir -p ${dir}`);
    const result = execSync(`yo ewnd9-npm && rm -rf ${dir}/.git`, { env, cwd: dir });
    console.log(result.toString());
  });
