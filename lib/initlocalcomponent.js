var fs = require('fs');
var nunjucks = require('nunjucks');

function initlocalcomponent (componentName) {
  fs.writeFileSync(`${componentName}.js`, nunjucks.render('./templates/localcomponent.js', {
    componentName: componentName
  }));
}
module.exports = initlocalcomponent;
