'use strict';

const npmCheck = require('npm-check');
const fs = require('fs');
const pify = require('pify');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora('Checking');
spinner.start();

const rootDir = './output';

pify(fs.readdir)(rootDir)
  .then(directories => {
    return Promise.all(directories.map(dir => {
      return npmCheck({ cwd: rootDir + '/' + dir })
        .then(currentState => ({ dir, currentState }));
    }));
  })
  .then(report => {
    spinner.stop();

    report.forEach(report => {
      let hasImprovements;

      console.log(chalk.underline(report.dir) + '\n');
      report.currentState.get('packages').forEach(pkg => {
        if (pkg.latest !== pkg.installed) {
          hasImprovements = true;

          console.log(pkg.moduleName);
          console.log(`${chalk.green(pkg.latest)}/${chalk.red(pkg.installed)}`);
        }
      });

      if (!hasImprovements) {
        console.log('everything is alright');
      }

      console.log();
    });
  })
  .catch(err => console.log(err.stack));
