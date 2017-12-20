#!/usr/bin/env node
var program = require('commander');

var version = require('./package.json').version;

var initcomponent = require('./lib/initcomponent');
var initlocalcomponent = require('./lib/initlocalcomponent');
var initscene = require('./lib/initscene');
var install = require('./lib/install');

program
  .command('initcomponent')
  .description('start component from template for publishing')
  .action(initcomponent);

program
  .command('initlocalcomponent <componentName>')
  .description('start component from template for local application')
  .action(initlocalcomponent);

program
  .command('initscene')
  .description('start scene from template')
  .action(initscene);

program
  .command('install <moduleName> [htmlFile]')
  .description('install component from registry to html file')
  .action(install);

program
  .version(version)
  .parse(process.argv);

if (!program.args.length) program.help();
