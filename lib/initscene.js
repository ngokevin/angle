/* global find, ls, sed */
require('shelljs/global');
var exec = require('child_process').exec;
var fs = require('fs');
var inquirer = require('inquirer');
var titleCase = require('title-case');
var nunjucks = require('nunjucks');
var path = require('path');
var slug = require('slug');

var aframeVersion = Object.keys(require('aframe-registry')).sort().reverse()[0];

function initscene () {
  console.log('Initializing A-Frame scene');
  var template = path.resolve(__dirname, '../templates/scene');
  cp('-r', template, './.scene');
  cd('.scene');
  customize().then(function (shortTitle) {
    cd('../');
    mv('.scene', shortTitle);
  });
}
module.exports = initscene;

/**
 * Customize component template.
 */
function customize () {
  var q1 = {
    name: 'title',
    message: 'What is your scene\'s title? (e.g., Forest Scene)',
    type: 'input',
    default: 'aframe-boilerplate'
  };

  var q2 = {
    name: 'handControls',
    message: 'Do you want tracked controls with hand models?',
    type: 'confirm',
    default: false
  };

  // Go.
  return new Promise(function (resolve) {
    inquirer.prompt([q1, q2]).then(function (answers) {
      // Slugify.
      answers.shortTitle = answers.title.toLowerCase().replace(/\s+/g, '-'
);
      run(answers)
      resolve(answers.shortTitle);
    });
  });

  /**
   * Do all the string replacements.
   */
  function run (answers) {
    answers.aframeVersion = aframeVersion;
    ls(['index.html', 'package.json', 'README.md']).forEach(function (file) {
      fs.writeFileSync(file, nunjucks.render(file, answers));
    });
  }
}
