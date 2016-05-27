var fs = require('fs');
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  writing: function() {
    this.npmInstall(['react', 'react-dom', 'can-react', 'steal-jsx'], { 'save': true });
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), { });

    var packageDelta = {
      system: {
        map: {
          'can-connect/data/inline-cache/inline-cache': 'can-react/extensions/can-connect-inline-cache'
        },
        npmIgnore: [
          'donejs-react'
        ]
      }
    };

    var customizer = function(a, b) {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    };

    this.fs.writeJSON('package.json', _.merge(packageDelta, this.pkg, customizer));
  }
});
