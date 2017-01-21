/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('{{ shortName }} component', function () {
  setup(function (done) {
    this.el = entityFactory();
    this.el.setAttribute('{{ shortName }}', {});
    this.el.addEventListener('loaded', function () {
      done();
    });
  });

  suite('foo property', function () {
    test('is good', function () {
      assert.equal(1, 1);
    });
  });
});
