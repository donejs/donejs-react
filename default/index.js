var generator = require('yeoman-generator');
var _ = require('lodash');
var fs = require('fs');

module.exports = generator.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('name', {
      type: String,
      required: true
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  installingCanReact: function() {
    this.npmInstall(['can-react'], { 'save': true });
  },

  writing: function() {
    var packageDelta = {
      system: {
        map: {
          'can-connect/data/inline-cache/inline-cache': '../node_modules/can-react/extensions/can-connect-inline-cache'
        }
      }
    };

    this.fs.writeJSON('package.json', _.extend(packageDelta, this.pkg));
  }
});
