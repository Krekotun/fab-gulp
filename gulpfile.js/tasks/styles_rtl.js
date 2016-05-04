var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function stylesRTL() {
	return gulp.src( config.paths.built.styles.all )
		.pipe( $.rtlcss() )
		.pipe( $.rename({
			suffix: '-rtl'
		}) )
		.pipe( gulp.dest(config.paths.built.styles.path) )
};

module.exports = stylesRTL;
