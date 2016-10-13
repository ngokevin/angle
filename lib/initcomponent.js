/* global find, ls, sed */
require('shelljs/global');
var exec = require('child_process').exec;
var inquirer = require('inquirer');
var path = require('path');

function initcomponent () {
  console.log('Initializing A-Frame component');
  var template = path.resolve(__dirname, '../templates/component');
  cp('-r', template, './.component');
  cd('.component');
  customize().then(function (componentName) {
    cd('../');
    mv('.component', `aframe-${componentName}-component`);
  });
}
module.exports = initcomponent;

/**
 * Customize component template.
 */
function customize () {
  var CONFIG = {shortname: '', longname: '', repo: '', author: ''};

  exec("sed '1,/--trim--/d' README.md | tee README.md");

  if (CONFIG.shortname && CONFIG.longname && CONFIG.repo) {
    run(CONFIG);
    process.exit(0);
  }

  var q1 = {
    name: 'shortname',
    message: 'What is your component\'s short-name? (e.g., `rick-roll` for aframe-rick-roll-component, `<a-entity rick-roll="true">`)',
    type: 'input'
  };

  var q2 = {
    name: 'longname',
    message: 'What is your component\'s long-name? (e.g., `Rick Roll` for A-Frame Rick Roll Component)',
    type: 'input'
  };

  var q3 = {
    name: 'repo',
    message: 'Where is your component on Github? (e.g., yourusername/aframe-rick-roll-component)',
    type: 'input'
  };

  var q4 = {
    name: 'author',
    message: 'Who are you? (e.g., Jane John <jj@example.com>)',
    type: 'input'
  };

  // Go.
  return new Promise(function (resolve) {
    inquirer.prompt([q1, q2, q3, q4]).then(function (ans) {
      run(ans)
      resolve(ans.shortname);
    });
  });

  /**
   * Do all the string replacements.
   */
  function run (ans) {
    ls(['index.js', 'package.json', 'README.md']).forEach(function (file) {
      sed('-i', 'aframe-example-component', 'aframe-' + ans.shortname + '-component', file);
      sed('-i', 'Example Component', ans.longname + ' Component', file);
      sed('-i', 'Example component', ans.longname + ' component', file);
      sed('-i', "'example'", "'" + ans.shortname + "'", file);
    });

    ls('README.md').forEach(function (file) {
      sed('-i', 'example component', ans.longname + ' component', file);
      sed('-i', 'example=', ans.shortname + '=', file);
    });

    find('examples').filter(function (file) { return file.match(/\.html/); }).forEach(function (file) {
      sed('-i', 'Example Component', ans.longname + ' Component', file);
      sed('-i', 'ngokevin/aframe-component-boilerplate', ans.repo, file);
    });

    ls(['package.json', 'README.md']).forEach(function (file) {
      sed('-i', 'aframe-example-component', 'aframe-' + ans.shortname + '-component', file);
      sed('-i', 'ngokevin/aframe-component-boilerplate', ans.repo, file);
      sed('-i', 'Kevin Ngo <me@ngokevin.com>', ans.author, file);
    });
  }
}
