var fs = require('fs');
var registry = require('aframe-registry');

function install (moduleName, htmlFile) {
  htmlFile = htmlFile || 'index.html';
  console.log('Installing A-Frame component `' + moduleName + '` to `' + htmlFile + '`');

  if (!fs.existsSync(htmlFile)) {
    throw new Error('HTML file `' + htmlFile + '` not found. ' +
                    'Try double-checking your HTML file name: ' +
                    '`angle install <component> dev.html`');
  }

  var html = fs.readFileSync(htmlFile, 'utf-8');

  if (!(moduleName in registry['0.3.0'].components)) {
    throw new Error('Component `' + moduleName + '` not found in registry');
  }

  var script = '<script src="' + registry['0.3.0'].components[moduleName].file +
               '"></script>';
}
module.exports = install;
