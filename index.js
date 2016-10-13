#!/usr/bin/env node
var program = require('commander');

var initcomponent = require('./lib/initcomponent');

program
  .command('initcomponent')
  .description('creates component template for publishing')
  .action(initcomponent);

program.parse(process.argv);
