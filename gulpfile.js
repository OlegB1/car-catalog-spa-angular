var gulp = require('gulp');

var webpack = require('gulp-webpack');

var nodemon = require('gulp-nodemon');

gulp.task('js', function() {
  return gulp.src('client/src/app.js')
    .pipe(webpack({
    	watch: true,
		output: {filename: 'bundle.js'}
    }))
    .pipe(gulp.dest('client/build'));
});

gulp.task('server', function () {
	nodemon({
		script: 'server/index.js',
		ext: 'js',
		watch: ['server', 'node_modules']
	});
});

gulp.task('watch-html',function () {
    gulp.watch('client/src/**/*.+(html|css)',['build']);
});

gulp.task('copy', function () {
  return gulp
    .src(['client/src/index.html','client/src/style.css','client/src/home.html','client/src/electrocars.html',
		'client/src/car.html','client/src/bin.html','client/src/search.html'])
    .pipe(gulp.dest('client/build'))

});

gulp.task('app', ['js', 'copy', 'server', 'watch-html']);




// gulp.task('js', function() {
//   return gulp.src('client/dev/app.js')
//     .pipe(webpack({output: {filename: 'app.js'}}))
//     .pipe(gulp.dest('client/build'));
// });

// gulp.task('copy', function () {
//   return gulp
//     .src(['client/dev/app.css','client/dev/index.html']) 
//     .pipe(gulp.dest('client/build'));
// });

// gulp.task('watch-client', function() {
// 	gulp.watch('client/dev/**/*.*', ['build']);	
// });

// gulp.task('watch-start-server', function () {
// 	nodemon({
// 		script: 'index.js',
// 		ext: 'js',
// 		watch: ['server', 'node_modules']
// 	});
// });

// gulp.task('build', ['js', 'copy']);

// gulp.task('local', ['build', 'watch-client', 'watch-start-server']);