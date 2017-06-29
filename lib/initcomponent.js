/* global find, ls, sed */
require('shelljs/global');
var exec = require('child_process').exec;
var fs = require('fs');
var glob = require('glob');
var inquirer = require('inquirer');
var nunjucks = require('nunjucks');
var path = require('path');
var titleCase = require('title-case');
var slug = require('slug');

var aframeVersion = Object.keys(require('aframe-registry')).sort().reverse()[0];

function initcomponent () {
  console.log('Initializing A-Frame component...\n');
  mkdir('.component');
  // `cp -r`ing the whole directory has unexpected results. Doing a glob first.
  // `https://github.com/isaacs/node-glob#dots`
  glob.sync(path.resolve(__dirname, '../templates/component/*'), {dot:true}).forEach(file => {
    cp('-r', file, './.component');
  });
  cd('./.component');
  rm('./dist/.gitkeep');
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
    name: 'description',
    message: 'Can you provide a short description of your component?',
    type: 'input',
    default: function (answers) {
      return `A ${answers.prettyName} component for A-Frame.`;
    }
  };

  var q4 = {
    name: 'repo',
    message: 'Where will your component live on Github? (e.g., `myusername/aframe-foo-component`)',
    type: 'input',
    default: function (answers) {
      return `myusername/aframe-${answers.shortName}-component`;
    }
  };

  var q5 = {
    name: 'author',
    message: 'Who are you? (e.g., `Jane John <jj@foo.com>`)',
    type: 'input',
    default: function () {
      return 'Jane John <jj@foo.com>';
    }
  };

  // Go.
  return new Promise(function (resolve) {
    inquirer.prompt([q1, q2, q3, q4, q5]).then(function (answers) {
      run(answers)
      resolve(answers.shortName);
    }, console.error);
  });

  /**
   * Do all the string replacements.
   */
  function run (answers) {
    ls(['LICENSE', 'package.json', 'README.md', 'index.js', 'index.html', 'examples/basic/index.html', 'tests/index.test.js']).forEach(function (file) {
      answers.aframeVersion = aframeVersion;
      answers.npmName = `aframe-${answers.shortName}-component`;
      fs.writeFileSync(file, nunjucks.render(file, answers));
    });
  }
}
