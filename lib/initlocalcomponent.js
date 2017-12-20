var fs = require('fs');
var path = require('path');

function initlocalcomponent (componentName) {
  fs.writeFileSync(
    `${componentName}.js`,
    fs.readFileSync(path.resolve(__dirname, '../templates/localcomponent.js'), 'utf-8')
        .replace('{{ componentName }}', componentName)
  );
}
module.exports = initlocalcomponent;
