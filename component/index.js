const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');
const utils = require('../lib/utils');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.argument('name', {
			type: String,
			required: false,
			desc: 'The module name for your component (e.g. restaurant/list)'
		});

		this.argument('className', {
			type: String,
			required: false,
			desc: 'The class name of the component (e.g. ComponentName)'
		});

		this.modletFiles = [
			'modlet/component.js',
			'modlet/component.jsx',
			'modlet/component.less',
			'modlet/component.html',
			'modlet/component-test.js',
			'modlet/test.html'
		];
	}

	prompting() {
		return this.prompt({
			name: 'name',
			message: 'What is the module name of your component (e.g. pmo/home)?',
			required: true,
			when: !this.name
		}).then((props) => {
			this.name = props.name;
			var className = _.capitalize(_.camelCase(this.name));

			return this.prompt({
				name: 'className',
				message: 'The class name of the component',
				default: className,
				when: !this.className
			}).then((props) => {
				_.extend(this, props);
			});
		});
	}

	writing() {
		this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

		var parts = this.name.split('/');
		var name = _.last(parts);
		var folder = this.config.get('folder') || 'src';
		var appName = this.config.get('name') || this.pkg.name;
		var fullPath = [ folder ].concat(parts);

		var options = {
			// ../ levels to go up to the root
			root: _.repeat('../', fullPath.length),
			// The full component path
			path: path.join.apply(path, fullPath),
			// The full className (prepending the short name if it isn't there yet)
			className: this.className,
			// The short name of the component (e.g. list for restaurant/list)
			name: name,
			app: appName,
			// The full module name (e.g. pmo/restaurant/list)
			module: [ appName ].concat(parts).join('/')
		};

		this.modletFiles.forEach((name) => {
			var target = name.replace('component', options.name).replace('modlet/', '');
			this.fs.copyTpl(
				this.templatePath(name),
				this.destinationPath(path.join(options.path, target)),
				options
			);
		});

		var mainTests = this.destinationPath(path.join(folder, 'test.js'));
		utils.addImport(mainTests, [appName].concat(fullPath.slice(1)).join('/') + '/' + name + '-test');
	}
};
