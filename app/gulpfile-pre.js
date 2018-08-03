/*
TOTO:
	-	Optimisé les compresseur
	- Enlever les prettifier
	- Finir le compilateur
	- Utilisé le dossier assets/js comme dossier d'injection direct - OK
	- Utilisé le dossier assets/css comme dossier d'injection direct 
		- Tricky a cause du precompilateur.
			Doit decompiler dans un dossier temporaire ou changer la structure 
			des assets pour accommoder un dossier de compilation.
			- Peux potentiellement créé un dossier app et vendor dans js

Note: 
	- Plus ou moins possible de compresser les JS des vendors et de 
	l'application en raison de la double compressions des vendors

*/


/*global console,require */
'use strict';

var gulp = require('gulp'),
		gzip = require('gulp-gzip'),
		sass = require('gulp-sass'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		order = require('gulp-order'),
		gulpIf = require('gulp-if'),
		clean = require('del'),
		stream = require('merge-stream'),
		inject = require('gulp-inject'),
		wrapper = require('gulp-wrapper'),
		mapping = require('gulp-sourcemaps'),
		stripDebug = require('gulp-strip-debug'),
		count = require('gulp-count'),


		
		
		// Remplacé par gulp-compressor
		//minify_json = require('gulp-jsonminify'),
		compress = require('gulp-compressor'),

		compressimages = require('gulp-imagemin');

// PARAMS
var sourceAppCSS = [
			'src/app/app.scss', 
			'src/app/**/*.scss'],

		sourceVendorsCSS = [
			'src/vendors/**/*.scss', 
			'src/vendors/**/*.css'],

		sourceAppJS = [
			'src/app/app.js', 
			'src/app/**/*.js'],

		sourceVendorsJS = [
			'src/vendors/**/jquery*.js',
			'src/vendors/**/angular.*.js',
			'src/vendors/**/bootstrap*.js',
			'src/vendors/**/highcharts.js',
			'src/vendors/**/tweenMax*.js',
			/* Bluerush vendors */
			'src/vendors/**/BluerushEventMediator*.js',//Bluerush event mediator
			'src/vendors/**/BluerushJqueryAddon*.js',//Bluerush jquery addon library
			'src/vendors/**/blueUtils*.js',//Bluerush utils library
			'src/vendors/**/BluePlayer*.js',//Bluerush smart player
			'src/vendors/**/bm*.js',//Hernan Torrisi bodymovin framework
			'src/vendors/**/Individeo*.js',//BluerushIndivideo framework

			'src/vendors/**/*.js',

			// MERIDIAN
			'src/assets/js/bootstrap.min.js',
			'src/assets/js/rates.js'
			],
		
		sourceJSON = [
			'src/assets/**/*.json'],
		
		sourceHTML = [
			'src/**/*.html'],

		exportJSP = [
			'export/**/*.jsp'],
		
		exportJS = [
			'export/assets/vendors.js',
			'export/assets/**/*.js',
			'export/assets/app.js'],
		exportCSS = [
			'export/assets/css/vendors.css',
			'export/assets/css/**/*.css',
			'export/assets/css/app.css'],

		exportConfig = [
			'export/assets/js/**/*.js'],
		exportAssetsJS = [
			'export/assets/app/app.js'],
		exportAssetsCSS = [
			'export/assets/app/app.css'],
		exportVendorsJS = [
			'export/assets/app/vendors.js'],
		exportVendorsCSS = [
			'export/assets/app/vendors.css'];


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

// COUNTER
var _count = {};
function onNewCount (src, cache, key, task) {
	return gulp.src(src, {read : false})
	.pipe(count({
		logger : function (value) {
			if (_count[cache] !== value) { 
				_count[cache] = value; 
				_count[key] = true;
				if (task) { task.call(); }
			} else {
				_count[key] = false;
			}
		}
	}));
}
function getCount (key) {
	return _count[key];
}

// HTML
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
			.pipe(inject(gulp.src(options.includeVendorsJS, { read: false }), 
				{	relative: true,
					transform: injectJS,
					starttag: '<!-- inject:vendors:js -->' }))
			.pipe(inject(gulp.src(options.includeAppJS, { read: false }), 
				{	relative: true,
					transform: injectJS,
					starttag: '<!-- inject:app:js -->' }))
			.pipe(inject(gulp.src(options.includeVendorsCSS, { read: false }), 
				{	relative: true,
					transform: injectCSS,
					starttag: '<!-- inject:vendors:css -->'
				}))
			.pipe(inject(gulp.src(options.includeAppCSS, { read: false }), 
				{	relative: true,
					transform: injectCSS,
					starttag: '<!-- inject:app:css -->'
				}))
			.pipe(gulpIf(options.format === 'prod', compress()))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

function buildJS (options) { 
	options = options || {};
	if (options.from && options.to) {
		return gulp.src(options.from)
			.pipe(plumber(crash))
			.pipe(gulpIf(options.map !== false, mapping.init()))
			.pipe(gulpIf(options.order, order(options.order)))
			.pipe(concat(options.name || ''))
			.pipe(gulpIf(options.secure, wrapper({
		  	header: '(function (){',
		  	footer: '}());'})))
			.pipe(gulpIf(options.format === 'prod', stripDebug()))
			.pipe(gulpIf(options.format === 'prod', compress()))
			.pipe(gulpIf(options.map !== false, mapping.write()))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

function buildJSON (options) {
	options = options || {};
	if (options.from && options.to) {
		return gulp.src(options.from)
		.pipe(gulpIf(options.format === 'prod', compress()))
		.pipe(gulp.dest(options.to));
	} 
	return gulp;
}

function buildCSS (options) {
	options = options || {};
	if (options.from && options.to && options.name) {
		return gulp.src(options.from)
			.pipe(plumber(crash))

			.pipe(gulpIf(options.map !== false, mapping.init()))
			.pipe(gulpIf(options.order, order(options.order)))
			.pipe(concat(options.name))
			.pipe(gulpIf(options.format === 'dev', sass()))
			.pipe(gulpIf(options.map !== false, mapping.write()))
			.pipe(gulp.dest(options.to));
	}
	return gulp;
}

/* OPTIMIZE */
function optimizeAssets (src, dest) {
	return gulp.src(src)
		.pipe(gzip())
		.pipe(gulp.dest(dest));
}

function optimizeImage (src, dest) {
	return gulp.src(src)
		.pipe(compressimages({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(dest));
}



// Need register function to compile other possible folder structure
// HERE




// DEFAULT *********************
gulp.task('default', ['dev']);

/*** 
	DEV
	- Injecter les sources voulues séparément dans le HTML/JSP/PHP
	- Compiler le scss pour son utilisation
	- Utiliser le watch seulement pour injecter les sources et non les injecter sur l'initialisation
*/
// DEV PARAMS
// DEV MAIN
gulp.task('dev', ['watch:dev','watch:assets'], function () {
	return gulp.start(['dev:assets:css', 'dev:vendors:css']);
});

gulp.task('dev:clean', function () {
	clean(['src/assets/css/app.css', 'src/assets/vendor.css', 'src/assets/js/app.js', 'src/assets/js/vendor.js']);
});

var bemPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-boilerplate/src/vendors/js/BluerushEventMediator.js',
	utilsPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-boilerplate/export/assets/js/app.js',
	individeoPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-individeo-framework/export/assets/js/app.js',
	smartPlayerPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-smart-player/export/assets/js/app.js',
	smartPlayerCSSPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-smart-player/export/assets/css/app.css',
	bodymovinPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-smart-player/src/vendors/js/bm.js',
	bluerushJqueryAddonPath = 'C:/Users/Emz/Desktop/bluerush/_bluerush-smart-player/src/vendors/js/BluerushJqueryAddon.js';

var bemFileName = 'BluerushEventMediator.js',
	utilsFileName = 'blueUtils.js',
	individeoFileName = 'Individeo.js',
	smartPlayerFileName = 'BluePlayer.js',
	smartPlayerCSSFileName = 'smartPlayer.css',
	bodymovinFileName = 'bm.js',
	bluerushJqueryAddonFileName = 'BluerushJqueryAddon.js';

// gulp.task('watch:dev', ['dev:clean'], function () {
gulp.task('watch:dev', ['get-external-dependencies'], function () {

	gulp.watch(sourceAppCSS, ['dev:assets:css','build-all-css']);
	gulp.watch(sourceVendorsCSS, ['dev:vendors:css','build-all-css']);
	gulp.watch(['src/app/**/*.js', 'src/vendors/**/*.js', 'src/assets/css/**/*.css' ], ['watch:assets','build-all-js']);
	
	/* CUSTOM WATCH */
	gulp.watch([bemPath], ['watchExternalBEM']);
	//gulp.watch([utilsPath], ['watchExternalUtils']);
	//gulp.watch([individeoPath], ['watchExternalIndivideo']);
	//gulp.watch([smartPlayerPath], ['watchExternalSmartPlayer']);
	//gulp.watch([smartPlayerCSSPath], ['watchExternalSmartPlayerCSS']);
	//gulp.watch([bodymovinPath], ['watchExternalBM']);
	//gulp.watch([bluerushJqueryAddonPath], ['watchExternalBluerushJqueryAddon']);

	return gulp;
});

/* EMZ GULP SETUP START */

gulp.task('get-external-dependencies',function(){
	return stream(
		wBem(),
		//wUtils(),
		//wIndiVideo(),
		//wSmartPlayer(),
		//wSmartPlayerCss(),
		//wBodymovin(),
		//wBluerushJqueryAddon(),
		buildAllCss(),
		buildAllJs()
		);
});

gulp.task('build-all-js',function(){
	return buildAllJs();
});

function buildAllJs(){
	return stream(
		buildJS({
			from: sourceAppJS,
			to: 'export/assets/js/',
			name:'app.js',
			order: sourceAppJS,
			format: 'dev',
			map:false,
			secure: true
		}),
		buildJS({
			from: sourceVendorsJS,
			to: 'export/assets/js/',
			name:'vendors.js',
			order: sourceVendorsJS,
			format: 'raw',
			map:false,
			secure: false
		})
	);
}

gulp.task('build-all-css',function(){
	return buildAllCss();
});

function buildAllCss(){
	return stream(
		buildCSS({
			from: sourceAppCSS,
			to: 'export/assets/css/',
			name:'app.css',
			order: sourceAppCSS,
			map:false,
			format: 'dev'
		}),
		buildCSS({
			from: sourceVendorsCSS,
			to: 'export/assets/css/',
			map:false,
			name:'vendors.css'
		})
	);
}

gulp.task("watchExternalBEM",wBem);
function wBem(){
	return gulp.src(bemPath)
		.pipe(concat(bemFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}

gulp.task("watchExternalUtils",wUtils);
function wUtils(){
	return gulp.src(utilsPath)
		.pipe(concat(utilsFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}

gulp.task("watchExternalIndivideo",wIndiVideo);
function wIndiVideo(){
	return gulp.src(individeoPath)
		.pipe(concat(individeoFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}
gulp.task("watchExternalSmartPlayer",wSmartPlayer);
function wSmartPlayer(){
	return gulp.src(smartPlayerPath)
		.pipe(concat(smartPlayerFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}
gulp.task("watchExternalSmartPlayerCSS",wSmartPlayerCss);
function wSmartPlayerCss(){
	return gulp.src(smartPlayerCSSPath)
		.pipe(concat(smartPlayerCSSFileName))
		.pipe(gulp.dest('src/vendors/css/'));
}
gulp.task("watchExternalBM",wBodymovin);
function wBodymovin(){
	return gulp.src(bodymovinPath)
		.pipe(concat(bodymovinFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}
gulp.task("watchExternalBluerushJqueryAddon",wBluerushJqueryAddon);
function wBluerushJqueryAddon(){
	return gulp.src(bluerushJqueryAddonPath)
		.pipe(concat(bluerushJqueryAddonFileName))
		.pipe(gulp.dest('src/vendors/js/'));
}
/* EMZ GULP SETUP END */

gulp.task('watch:assets', function () {
	onNewCount(['src/app/**/*.js', 'src/vendors/**/*.js', 'src/assets/css/**/*.css'], 'appJS', 'newAppJS', function () {
		buildHTML({
			from : sourceHTML,
			to : 'src/',
			includeVendorsJS : sourceVendorsJS,
			includeAppJS : sourceAppJS,
			includeVendorsCSS : ['src/assets/css/vendors.css'],
			includeAppCSS : ['src/assets/css/app.css']
		});
	});
});

gulp.task('dev:assets:css', function () {
	return buildCSS({
		from: sourceAppCSS,
		to: 'src/assets/css/',
		name:'app.js',
		order: sourceAppCSS,
		format: 'dev'
	});
});

gulp.task('dev:vendors:css', function () {
	return buildJS({
		from: sourceVendorsCSS,
		to: 'src/assets/css/',
		name:'vendors.css'
	});
});


/*
	BUG 
	- Les fichiers sources sont injecter avant que 
		les fichier ne soit identifier à l'export donc les 
		sources pointent sur un dossier qui sort du root serveur.
*/

// EXPORT *********************
gulp.task('export', ['export:assets', 'export:html']);
gulp.task('export:clean', function () {
	return clean(['export/**/*.html','export/assets']);
});
gulp.task('export:move', ['export:clean'], function () {
	return stream(
		move(['src/**/*.html'], 'export'),
		move(['src/assets/**/*'], 'export/assets'));
});
gulp.task('export:assets', ['export:move'], function () {
	return stream(
		buildJS({
			from: sourceAppJS,
			to: 'export/assets/js/',
			name:'app.js',
			order: sourceAppJS,
			format: 'dev',
			secure: true
		}),
		buildCSS({
			from: sourceAppCSS,
			to: 'export/assets/css/',
			name:'app.css',
			order: sourceAppCSS,
			format: 'dev'
		}),
		buildJS({
			from: sourceVendorsJS,
			to: 'export/assets/js/',
			name:'vendors.js',
			order: sourceVendorsJS,
			format: 'raw',
			secure: false
		}),
		buildCSS({
			from: sourceVendorsCSS,
			to: 'export/assets/css/',
			name:'vendors.css'
		}),
		move(['src/assets/**/*'], 'export/assets/')
	);
});
gulp.task('export:html', ['export:assets'], function () { 
	return stream(
		buildHTML({
			from : ['export/**/*.html', 'export/**/*.jsp'],
			to : 'export/',
			includeJS : ['export/assets/js/vendors.js', 'export/assets/js/app.js'],
			includeCSS : ['export/assets/css/vendors.css', 'export/assets/css/app.css'],
			format : 'dev'
		}));
});


// COMPILE *********************
gulp.task('compile', ['compile:move', 'compile:assets', 'compile:app', 'compile:optimize']);
gulp.task('compile:clean', function () {
	return clean(['export/**/*.html','export/assets']);
});
gulp.task('compile:move', ['compile:clean'], function () {
	return move(['src/assets/**/*'], 'export/assets/');
});
// COMPILE ASSETS
gulp.task('compile:assets', ['compile:move'], function () {
	return stream(
		buildJS({
			from: sourceAppJS,
			to: 'export/assets/js/',
			name:'app.js',
			order: sourceAppJS,
			format: 'prod',
			secure: true,
			map : false
		}),
		buildJS({
			from: sourceVendorsJS,
			to: 'export/assets/js/',
			name:'vendors.js',
			order: sourceVendorsJS,
			format: 'raw',
			secure: false,
			map : false
		}),
		buildCSS({
			from: [].concat(sourceVendorsCSS,sourceAppCSS),
			to: 'export/assets/css/',
			name:'app.css',
			order: [].concat(sourceVendorsCSS,sourceAppCSS),
			format: 'dev'
		})
	);
});
// COMPILE OPTIMIZATION
gulp.task('compile:optimize', ['compile:assets'], function () { 
	//return stream(
	//	optimizeAssets(['export/assets/js/**/*'], 'export/assets/js/'),
	//	optimizeAssets(['export/assets/css/**/*'], 'export/assets/css/'),
	//	optimizeImage(['export/img/**/*'], 'export/img/')
	//);
});

// COMPILE HTML
gulp.task('compile:app', ['compile:assets'], function () { 
	return stream(
		buildHTML({
			from : sourceHTML,
			to : 'export/',
			includeJS : exportJS,
			includeCSS : exportCSS,
			format : 'prod'
		}),
		buildHTML({
			from : exportJSP,
			to : 'export/',
			includeJS : exportJS,
			includeCSS : exportCSS,
			format : 'raw'
		}));
});
var browserSync = require('browser-sync');
gulp.task('serve', ['default'], function() {
   browserSync.init({
          server: {
            baseDir: './src/',
            port: 3000
          }
        });
});
