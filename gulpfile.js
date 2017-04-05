const gulp = require('gulp'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

let pathSource = {
    sass:  `${__dirname}/assets/sass/*.scss`,
    js: `${__dirname}/weblib/*.js`
}

let pathOutput = {
    sass: `${__dirname}/assets/css`,
    js: `${__dirname}/assets/js`
}

gulp.task('sass:compile', (cb) => {
    pump([
        gulp.src(pathSource.sass),
        sass({outputStyle: 'compressed'}),
        gulp.dest(pathOutput.sass),
        notify('SASS compiled!')
    ], cb);
});

gulp.task('sass:watch', () => {
    gulp.watch(pathSource.sass, ['sass:compile']);
});

gulp.task('js:minify', (cb) => {
    pump([
        gulp.src(pathSource.js),
        concat('script.js'),
        uglify(),
        gulp.dest(pathOutput.js),
        notify('JS minified!')
    ], cb);
});