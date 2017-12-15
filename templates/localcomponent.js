AFRAME.registerComponent('{{ componentName }}', {
  schema: {
    foo: {type: 'string'}
  },

  init: function () {
    var el = this.el;
    var data = this.data;
  },

  update: function () {
    var el = this.el;
    var data = this.data;
  }
});
