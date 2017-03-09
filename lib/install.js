var cheerio = require('cheerio');
var fs = require('fs');
var registry = require('aframe-registry');

function install (moduleName, htmlFile) {
  htmlFile = htmlFile || 'index.html';
  console.log(`Installing A-Frame component \`${moduleName}\` to \`${htmlFile}\``);

  // Check for HTML file.
  if (!fs.existsSync(htmlFile)) {
    throw new Error(`HTML file \`${htmlFile}\` not found. ` +
                    'Try double-checking your HTML file name: ' +
                    `angle install ${moduleName} dev.html`);
  }

  // Read HTML file.
  var html = fs.readFileSync(htmlFile, 'utf-8');
  var $ = cheerio.load(html);

  // Check already installed.
  if ($(`[data-angle="${moduleName}"]`).length) {
    throw new Error(`\`${moduleName}\` is already installed in \`${htmlFile}\``);
  }

  // Infer A-Frame version.
  var aframeScript;
  var version = Object.keys(registry).sort().reverse()[0];
  $('script').each(function (i, script) {
    var $script = $(script);
    var src = $script.attr('src');

    if (src.indexOf('aframe.js') === -1 && src.indexOf('aframe.min.js') === -1 &&
        src.indexOf('aframe-master.js') === -1 &&
        src.indexOf('aframe-master.min.js') === -1) {
      return;
    }

    aframeScript = $script;
    var versionMatch = src.match(/\d.\d.\d/);
    if (versionMatch) {
      version = versionMatch[0];
      console.log(`Detected A-Frame version ${version}`);
    } else {
      console.log(`A-Frame not detected in HTML file. Using latest version ${version}`);
    }
  });

  // A-Frame script tag not found.
  if (!aframeScript) {
    console.log('A-Frame script tag not found. Assuming latest version.');
    version = Object.keys(registry).sort().reverse()[0];
  }

  // Check registry.
  var file;
  version = getMajorVersion(version);
  if (moduleName in registry[version].components) {
    file = registry[version].components[moduleName].file;
  } else {
    // Search by component name.
    Object.keys(registry[version].components).forEach(function find (packageName) {
      var entry = registry[version].components[packageName];
      if (entry.names === moduleName || entry.names.indexOf(moduleName) !== -1) {
        file = entry.file;
      }
    });
  }
  if (!file) { throw new Error(`${moduleName} not found in A-Frame registry`); }

  // Inject.
  var el = `<script src="${file}" data-angle="${moduleName}"></script>`;
  html = html.replace('</head>', `  ${el}\n</head>`);
  fs.writeFileSync(htmlFile, html);
  console.log(`${moduleName} successfully installed to ${htmlFile}: ${file}`);
}
module.exports = install;

function getNumber (value) {
  return parseFloat(value.toFixed(2));
}

function getMajorVersion (version) {
  var clean = false;
  var major = version.split('.');
  for (var i = 0; i < major.length; i++) {
    if (clean) { major[i] = 0; }
    else if (major[i] !== '0') { clean = true; }
  }
  return major.join('.');
}
