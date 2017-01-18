/* global find, ls, sed */
require('shelljs/global');
var exec = require('child_process').exec;
var fs = require('fs');
var inquirer = require('inquirer');
var nunjucks = require('nunjucks');
var titleCase = require('title-case');
var path = require('path');
var slug = require('slug');

var aframeVersion = '0.4.0' || Object.keys(require('aframe-registry')).sort().reverse()[0];

function initcomponent () {
  console.log('Initializing A-Frame component...\n');
  var template = path.resolve(__dirname, '../templates/component');
  cp('-r', template, './.component');
  cd('.component');
  customize().then(function (componentName) {
    cd('../');
    mv('.component', `aframe-${componentName}-component`);
    console.log(`\nProject created: aframe-${componentName}-component`);
    console.log(`Get started developing: cd aframe-${componentName}-component && npm install && npm run start\n`);
  });
}
module.exports = initcomponent;

/**
 * Customize component template.
 */
function customize () {
  var q1 = {
    name: 'shortName',
    message: 'What is your component\'s name in usage? (e.g., `foo` for `aframe-foo-component`, `<a-entity foo="">`)',
    type: 'input',
    default: 'foo'
  };

  var q2 = {
    name: 'prettyName',
    message: 'What is your component\'s pretty name? (e.g., `Foo Bar` for `A-Frame Foo Bar Component`)',
    type: 'input',
    default: function (answers) {
      return titleCase(answers.shortName);
    }
  };

  var q3 = {
    name: 'repo',
    message: 'Where will your component live on Github? (e.g., yourusername/aframe-foo-component)',
    type: 'input'
  };

  var q4 = {
    name: 'author',
    message: 'Who are you? (e.g., `Jane John <jj@example.com>`)',
    type: 'input'
  };

  // Go.
  return new Promise(function (resolve) {
    inquirer.prompt([q1, q2, q3, q4]).then(function (answers) {
      run(answers)
      resolve(answers.shortName);
    }, console.error);
  });

  /**
   * Do all the string replacements.
   */
  function run (answers) {
    ls(['package.json', 'README.md', 'index.js', 'examples/index.html', 'examples/basic/index.html']).forEach(function (file) {
      answers.aframeVersion = aframeVersion;
      fs.writeFileSync(file, nunjucks.render(file, answers));
    });
  }
}
