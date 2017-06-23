var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	writing() {
		this.npmInstall([ 'react', 'react-dom', 'can-react', 'steal-react-jsx' ], { 'save': true });
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
};
