#!/usr/bin/env node
var program = require('commander');

var initcomponent = require('./lib/initcomponent');
var initscene = require('./lib/initscene');
var install = require('./lib/install');

program
  .command('initcomponent')
  .description('start component from template')
  .action(initcomponent);

program
  .command('initscene')
  .description('start scene from template')
  .action(initscene);

program
  .command('install <moduleName> [htmlFile]')
  .description('install component from registry to html file')
  .action(install);

program.parse(process.argv);
