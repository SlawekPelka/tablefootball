const gulp = require('gulp'),
    concat = require('gulp-concat'),
    pipe = require('gulp-pipe'),
    notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

let pathSource = {
    sass: `${__dirname}/assets/sass/*.scss`,
    js: `${__dirname}/weblib/*.js`
}

let pathOutput = {
    sass: `${__dirname}/assets/css`,
    js: `${__dirname}/assets/js`
}

gulp.task('sass:compile', () => {
    return pipe([
        gulp.src(pathSource.sass),
        sass({outputStyle: 'compressed'}),
        gulp.dest(pathOutput.sass),
        notify('SASS compiled!')
    ]);
});

gulp.task('sass:watch', () => {
    gulp.watch(pathSource.sass, ['sass:compile']);
});

gulp.task('js:minify', () => {
    return pipe([
        gulp.src(pathSource.js),
        concat('script.js'),
        uglify(),
        gulp.dest(pathOutput.js),
        notify('JS minified!')
    ]);
});