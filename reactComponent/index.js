var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var utils = require('../lib/utils');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('name', {
      type: String,
      required: false,
      desc: 'The module name for your component (e.g. restaurant/list)'
    });

		this.argument('tag', {
			type: String,
			required: false,
			desc: 'The class name of the component (e.g. ComponentName)'
		});

    this.modletFiles = [
      'modlet/component.js',
      'modlet/component.jsx',
      'modlet/component.scss',
      'modlet/demo.html',
      'modlet/viewmodel.js',
      'modlet/viewmodel_test.js'
    ];
  },

	prompting: function () {
		var done = this.async();
		this.prompt({
			name: 'name',
			message: 'What is the module name of your component (e.g. pmo/home)?',
			required: true,
			when: !this.name
		}, function (first) {
			var name = this.name = this.name || first.name;

			var tag = _.kebabCase(name);
			var prompts = [{
				name: 'tag',
				message: 'The tag name of the component',
				default: tag,
        when: !this.tag
			}];

			this.prompt(prompts, function (props) {
				_.extend(this, props);

				done();
			}.bind(this));
		}.bind(this));
	},

  writing: function () {
    var self = this;
    var parts = this.name.split('/');
    var name = _.last(parts);
    // The folder (usually src/)
    var folder = this.config.get('folder');
    var appName = this.config.get('name');
    var fullPath = [folder].concat(parts);

    var options = {
      // ../ levels to go up to the root
      root: _.repeat('../', fullPath.length),
      // The full component path
      path: path.join.apply(path, fullPath),
      // The full tag name (prepending the short name if it isn't there yet)
      tag: this.tag,
      // The short name of the component (e.g. list for restaurant/list)
      name: name,
      app: appName,
      // The full module name (e.g. pmo/restaurant/list)
      module: [appName].concat(parts).join('/')
    };

    this.modletFiles.forEach(function(name) {
      var target = name.replace('component', options.name).replace('modlet/', '');
      self.fs.copyTpl(
        self.templatePath(name),
        self.destinationPath(path.join(options.path, target)),
        options
      );
    });

    var mainTests = this.destinationPath(path.join(folder, 'test', 'test.js'));
    utils.addImport(mainTests, [appName].concat(fullPath.slice(1)).join('/')
      + '/' + name + '_test');
  }
});
