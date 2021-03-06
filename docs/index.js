#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');

const confPath = require.resolve('../docs/jsdoc.conf');
const destination = require(confPath).opts.destination;

mkdirp.sync(destination);

module.exports = ({ stdio = 'inherit' } = {}) => {
  process.stdout.write('Docs...');

  fs.removeSync(destination);

  require('child_process').spawnSync('npx', ['jsdoc', '-c', 'jsdoc.conf.js'], {
    stdio,
    cwd: path.join(__dirname, '..', 'docs'),
  });

  fs.copySync(path.join(confPath, '../../img'), `${destination}/img`);

  console.log(' done.');
};

if (process.argv.includes('--go'))  {
  module.exports();
}
