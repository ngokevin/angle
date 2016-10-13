#!/usr/bin/env node
var program = require('commander');

var initcomponent = require('./lib/initcomponent');
var install = require('./lib/install');

program
  .command('initcomponent')
  .description('creates component template for publishing')
  .action(initcomponent);

program
  .command('install <moduleName> [htmlFile]')
  .description('install component from registry to html file')
  .action(install);

program.parse(process.argv);
