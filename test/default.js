var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('donejs-react', function() {
	before(function(done) {
		helpers
			.run(path.join(__dirname, '../default'))
			.inTmpDir()
			.on('end', done)
		;
	});

	it('should write package.json file', function() {
		assert.file([ 'package.json' ]);
	});
});
