var jshint = require('gulp-jshint');

var gulp = require('gulp');
const eslint = require('gulp-eslint');

var stylish = require('jshint-stylish');



gulp.task('lint', function() {
    return gulp.src('./app/components/**/*.jsx')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('default', ['lint'], function() {});