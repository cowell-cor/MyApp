/*global console,require */
'use strict';

// Package config
var isProd = true,
	minimize = false,
	vendorsCSSwatch = 'src/vendors/**/*.@(scss|css)',
	appCSSwatch = 'src/app/**/*.@(scss|css)',
	registerConfig = {
	investmentSelector : {
		name: 'investmentSelector',
		markup: isProd ? [ 
			'src/investmentSelector.html'
		] : [ 
			'src/investmentSelector_dev.html'
		],
		javascript: isProd ? [
			//////////////////////////////
			// All vendors using jQuery //
			//////////////////////////////
			// Vendor has to expect jQuery to be able to work, and shouldn't look for it on the window object 
			// Vendor which looks for jQuery on the window object should be added after jquery.js, before no-conflict assignment
			'src/assets/js/no-conflict-wrap-start.js',
			'src/vendors/**/bootstrap.min.js',// removable?? make sure they have our plugins
			'src/assets/js/no-conflict-wrap-end.js',

			/* Include Angular plugin */
			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',
			//'src/vendors/**/highcharts.*js',
			//'src/vendors/**/highcharts-*js',
			'src/vendors/**/nouislider*.js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/investmentSelector/**/*.js'
		]:[	
			'src/vendors/**/jquery*js',
			'src/vendors/**/highcharts.*js',
			'src/vendors/**/bootstrap*js',
			'src/assets/js/jquery-cmsj-no-conflict.js',
			'src/vendors/**/angular.*js',

			/*Config*/		
			'src/assets/js/rates.js',
			'src/assets/config/dataConfig.js',
			'src/assets/config/istConfig.js',

			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',
			'src/vendors/**/highcharts-*js',
			'src/vendors/**/nouislider*.js',
			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/investmentSelector/**/*.js'
		],
		css: [
			'src/app/investmentSelector.scss', // FIRST ENTRY IS THE COMPILED INDEX
			vendorsCSSwatch, // THE NEXT ONES ARE FOR WATCHS ONLY 
			appCSSwatch
		]
	},

	retirementTool: {
		name: 'retirementTool',
		markup: isProd ? [ 
			'src/retirementTool.html'
		] : [ 
			'src/retirementTool_dev.html'
		],
		javascript: isProd ? [	

			'src/assets/js/no-conflict-wrap-start.js',
			'src/vendors/**/bootstrap.min.js',// removable?? make sure they have our plugins
			'src/assets/js/no-conflict-wrap-end.js',

			/* Include Angular plugin */
			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/retirementSavingsCalculator/**/*.js'
		]:[	
			'src/vendors/**/jquery*js',
			'src/vendors/**/highcharts.*js',
			'src/vendors/**/bootstrap*js',
			'src/assets/js/jquery-cmsj-no-conflict.js',
			'src/vendors/**/angular.*js',

			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-*js',

			/*Config*/		
			'src/assets/js/rates.js',
			'src/assets/config/dataConfig.js',
			'src/assets/config/rscConfig.js',

			'src/vendors/**/ui-bootstrap-tpls-*js',
			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/retirementSavingsCalculator/**/*.js'
		],
		css: [
			'src/app/retirementTool.scss', // FIRST ENTRY IS THE COMPILED INDEX
			vendorsCSSwatch, // THE NEXT ONES ARE FOR WATCHS ONLY 
			appCSSwatch
		]
	},

	threeInOne : {
		register: isProd,
		name: 'threeInOne',
		markup: isProd ? [ 
			'src/threeInOne.html'
		] : [ 
			'src/threeInOne_dev.html'
		],
		javascript: isProd ? [	
			//////////////////////////////
			// All vendors using jQuery //
			//////////////////////////////
			// Vendor has to expect jQuery to be able to work, and shouldn't look for it on the window object 
			// Vendor which looks for jQuery on the window object should be added after jquery.js, before no-conflict assignment
			'src/assets/js/no-conflict-wrap-start.js',
			'src/vendors/**/bootstrap.min.js',// removable?? make sure they have our plugins
			'src/assets/js/no-conflict-wrap-end.js',

			/* Include Angular plugin */
			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',

			/* Others */
			'src/app/app.js',
			'src/app/mortgagePaymentCalculator/**/*.js',
			'src/app/lineOfCreditCalculator/**/*.js',
			'src/app/affordabilityCalculator/**/*.js'
		]:[	
			'src/vendors/**/jquery*js',
			'src/vendors/**/highcharts.*js',
			'src/vendors/**/bootstrap*js',
			'src/assets/js/jquery-cmsj-no-conflict.js',
			'src/vendors/**/angular.*js',

			/*Config*/		
			'src/assets/js/rates.js',
			'src/assets/config/dataConfig.js',
			'src/assets/config/threeInOneConfig.js',

			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/mortgagePaymentCalculator/**/*.js',
			'src/app/lineOfCreditCalculator/**/*.js',
			'src/app/affordabilityCalculator/**/*.js'
		],
		css: [
			'src/app/threeInOne.scss', // FIRST ENTRY IS THE COMPILED INDEX
			vendorsCSSwatch, // THE NEXT ONES ARE FOR WATCHS ONLY 
			appCSSwatch
		]
	},

	hisa: {
		name: 'hisa',
		markup: isProd ? [ 
			'src/hisa.html'
		] : [ 
			'src/hisa_dev.html'
		],
		javascript: isProd ? [	

			'src/assets/js/no-conflict-wrap-start.js',
			'src/vendors/**/bootstrap.min.js',// removable?? make sure they have our plugins
			'src/assets/js/no-conflict-wrap-end.js',

			/* Include Angular plugin */
			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/hisaCalculator/**/*.js'
		]:[	
			'src/vendors/**/jquery*js',
			'src/vendors/**/highcharts.*js',
			'src/vendors/**/bootstrap*js',
			'src/assets/js/jquery-cmsj-no-conflict.js',
			'src/vendors/**/angular.*js',

			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-*js',

			/*Config*/		
			'src/assets/js/rates.js',
			'src/assets/config/dataConfig.js',
			'src/assets/config/hisaConfig.js',

			'src/vendors/**/ui-bootstrap-tpls-*js',
			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/app.js',
			'src/app/hisaCalculator/**/*.js'
		],
		css: [
			'src/app/hisa.scss', // FIRST ENTRY IS THE COMPILED INDEX
			vendorsCSSwatch, // THE NEXT ONES ARE FOR WATCHS ONLY 
			appCSSwatch
		]
	},
	motusHISA: {
		name: 'motusHISA',
		markup: isProd ? [ 
			'src/motusHISA.html'
		] : [ 
			'src/motusHISA.html'
		],
		javascript: isProd ? [	

			'src/assets/js/no-conflict-wrap-start.js',
			'src/vendors/**/bootstrap.min.js',// removable?? make sure they have our plugins
			'src/assets/js/no-conflict-wrap-end.js',

			/* Include Angular plugin */
			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-tpls-*js',

			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/motus.js',
			'src/app/motusHISACalculator/**/*.js'
		]:[	
			'src/vendors/**/jquery*js',
			'src/vendors/**/highcharts.*js',
			'src/vendors/**/bootstrap*js',
			'src/assets/js/jquery-cmsj-no-conflict.js',
			'src/vendors/**/angular.*js',

			'src/vendors/**/angular-*js',
			'src/vendors/**/ui-bootstrap-*js',

			/*Config*/		
			'src/assets/js/rates.js',
			'src/assets/config/motusDataConfig.js',
			'src/assets/config/motusHISAConfig.js',

			'src/vendors/**/ui-bootstrap-tpls-*js',
			/* Bluerush vendors */
			'src/vendors/**/formula*.js',
			'src/vendors/**/blueUtils*.js',
			/* Others */
			'src/app/motus.js',
			'src/app/motusHISACalculator/**/*.js'
		],
		css: [
			'src/app/motusHISA.scss', // FIRST ENTRY IS THE COMPILED INDEX
			vendorsCSSwatch, // THE NEXT ONES ARE FOR WATCHS ONLY 
			appCSSwatch
		]
	}
};

var gulp = require('gulp'),
		gzip = require('gulp-gzip'),
		sass = require('gulp-sass'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		rename = require('gulp-rename'),
		gulpIf = require('gulp-if'),
		clean = require('del'),
		stream = require('merge-stream'),
		inject = require('gulp-inject'),
		mapping = require('gulp-sourcemaps'),
		stripDebug = require('gulp-strip-debug'),
		compressJS = require('gulp-uglify');

// CORE
function move (src, dest) {
	return gulp.src(src)
		.pipe(gulp.dest(dest));
}
function crash (error) {
  console.log(error);
  this.emit('end');
}
function buster () {
	return new Date().getTime();
}

function injectJS (filepath) {
	return '<script type="text/javascript" src="' + filepath + '?' + buster() + '"></script>';
}
function injectCSS (filepath) {
	return '<link rel="stylesheet" href="' + filepath + '?' + buster() + '">';
}
function buildHTML (options) {
	options = options || {};
	if (options.from && options.to) {
		return gulp.src(options.from)
			.pipe(plumber(crash))
			.pipe(inject(gulp.src(options.includeJS, { read: false }), 
				{	relative: true,
					transform: injectJS }))
			.pipe(inject(gulp.src(options.includeCSS, { read: false }), 
				{	relative: true,
					transform: injectCSS
				}))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

function buildJS (options) { 
	options = options || {};
	if (options.from && options.to) {
		return gulp.src(options.from)
			.pipe(plumber(crash))
			// .pipe(gulpIf(options.format === 'dev', mapping.init()))
			.pipe(gulpIf(options.name !== undefined, concat(options.name)))
			// .pipe(gulpIf(options.format === 'prod', stripDebug()))
			.pipe(gulpIf(options.format === 'prod' && minimize, compressJS( { mangle : false } ))) // REMOVE/ADD OFFUSCATED MINIMIZE
			// .pipe(gulpIf(options.format === 'dev', mapping.write()))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

function buildCSS (options) {
	options = options || {};
	options.name = options.name || null;
	options.output = (options.format === 'prod') ? 'compressed' : 'compact' ;
	if (options.from && options.to) {
		return gulp.src(options.from)
			.pipe(plumber(crash))
			.pipe(gulpIf(options.format === 'dev', mapping.init()))
			.pipe(sass({outputStyle: options.output }))
			.pipe(gulpIf(options.name !== null, rename(options.name)))
			.pipe(gulpIf(options.format === 'dev', mapping.write()))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

function gzipSource (src, dest) {
	return gulp.src(src)
		.pipe(gzip())
		.pipe(gulp.dest(dest));
}


 
var devWatch = [],
		devInclude = [],
		test = [],
		devAssets = [],
		compileAssets = [],
		compileMarkup = [],
		exportMarkup = [];

gulp.task('default', ['dev']);

gulp.task('dev', ['watch', 'dev:include', 'dev:assets']);
gulp.task('dev:include', devInclude);
gulp.task('dev:assets', devAssets);
gulp.task('watch', devWatch);

gulp.task('compile', ['compile:assets', 'compile:include']);
gulp.task('compile:assets', compileAssets);
gulp.task('compile:include', compileMarkup);

gulp.task('export', function () {
 	return stream(
 		move('src/**/*.@(html|jsp|php)', 'export'),
 		move('src/assets/**/*', 'export/assets')
 		// gzipSource('src/assets/**/*.@(css|js)', 'export/assets/')
 	);
});



function register (name, html, js, css, watch) {

	if (!name) { return false; }
	
	watch = watch || [];
	html = html || [];
	js = js || [];
	css = css || [];

	var taskWatch = name + ':watch',
			include = name + ':include',
			devCSS = name + ':css',
			cleanCSS = name + ':css:clean',
			devJS = name + ':js',
			cleanJS = name + ':js:clean',
			assets = name + ':assets',
			markup = name + ':markup';
	
	gulp.task(taskWatch, function () {
		return gulp.watch(css, [devCSS]);
	});
	
	gulp.task(include, ['dev:assets'], function () {
		buildHTML({
			from : html,
			to : 'src/',
			includeJS : js,
			includeCSS : 'src/assets/css/' + name + '.doc.css'
		});
	});

	gulp.task(devCSS, [cleanCSS], function () {
		return buildCSS({
			from: [css[0]],
			to: 'src/assets/css/',
			name: name + '.doc.css',
			format: 'dev'
		});
	});

	gulp.task(devJS, [cleanJS], function () {
		return buildJS({
			from: js,
			to: 'src/assets/js/',
			name: name + '.doc.js',
			format: 'dev'
		});
	});

	gulp.task(cleanCSS, function () {
		return clean([
			'src/assets/css/' + name + '.doc.css', 
			'src/assets/css/' + name + '.css'
		]);
	});

	gulp.task(cleanJS, function () {
		return clean([
			'src/assets/js/' + name + '.doc.js',
			'src/assets/js/' + name + '.js'
		]);
	});

	gulp.task(assets, ['dev:assets'], function () {
		return stream(
			buildCSS({
				from: 'src/assets/css/' + name + '.doc.css',
				to: 'src/assets/css/',
				name: name + '.css',
				format: 'prod'
			}),
			buildJS({
				from: 'src/assets/js/' + name + '.doc.js',
				to: 'src/assets/js/',
				name: name + '.js',
				format: 'prod'
			})
		);
	});

	gulp.task(markup, ['compile:assets'], function () { 
		return buildHTML({
			from : html,
			to : 'src/',
			includeJS : 'src/assets/js/' + name + '.js',
			includeCSS : 'src/assets/css/' + name + '.css',
			format : 'dev'
		});
	});

	// DEV
	devWatch.push(taskWatch);
	devInclude.push(include);	
	devAssets.push(devCSS);
	devAssets.push(devJS);
	// COMPILER
	compileAssets.push(assets);
	compileMarkup.push(markup);
	// EXPORT
	exportMarkup = exportMarkup.concat(html);
}

var conf,key;
for (key in registerConfig) {
	conf = registerConfig[key];
	// register (name, html, javascript, css)
	register(conf.name,conf.markup,conf.javascript,conf.css);
}
var browserSync = require('browser-sync');
gulp.task('serve', ['default'], function() {
   browserSync.init({
          server: {
            baseDir: './src/',
            port: 3000
          }
        });
});
