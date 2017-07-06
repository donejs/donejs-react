var Generator = require('yeoman-generator');
const path = require('path');
var _ = require('lodash');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.srcFiles = [
			'src/index.js',
			'src/index.less'
		];
	}

	writing() {
		this.npmInstall([ 'react', 'react-dom', 'react-view-model', 'steal-react-jsx' ], { 'save': true });
		this.pkg = this.fs.readJSON(this.destinationPath('package.json'), { });

		var packageDelta = {
			system: {
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

		var folder = this.config.get('folder') || 'src';

		var options = {
			root: '.',
			path: folder
		};

		this.srcFiles.forEach((name) => {
			var target = name.replace('src/', '');
			this.fs.copyTpl(
				this.templatePath(name),
				this.destinationPath(path.join(options.path, target)),
				options
			);
		});
	}
};
