// Lien: https://gist.github.com/Fishrock123/8ea81dad3197c2f84366

let gulp = require('gulp');
const eslint = require('gulp-eslint');
let stylish = require('jshint-stylish');

let browserify = require('browserify'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    envify = require('envify'),
    sourceStream = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    del = require('del'),
    argv = require('yargs').argv,
    $ = require('load-plugins')('gulp-*'),
    chalk = require('chalk');

let exec = require('child_process').exec;


let path = {
    SRC: './app/',
    DIST: './dist/'
};

gulp.task('lint', () => {
    return gulp.src('./app/components/**/*.jsx')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/**
 * CSS Dev & Prod
 */
gulp.task('scsslint', () => {
    return gulp.src([path.SRC + 'scss/**/*.scss'])
        .pipe($.changed(path.DIST))
        .pipe($.scssLint());
});

gulp.task('scss', () => {
    return gulp.src(path.SRC + 'scss/app.scss') // point of entry
        .pipe($.plumber({
            errorHandler: (err) => {
                $.util.beep();
                $.util.log($.util.colors.red(err.message));
                this.emit('end');
            }
        }))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8']
        }))
        .pipe(gulp.dest(path.DIST));
});
gulp.task('minifycss', () => {
    return gulp.src(path.DIST + 'main.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest(path.DIST));
});

gulp.task('css', ['scss']);
gulp.task('cssprod', ['scss']);
gulp.task('cssProd', () => {
    return runSequence('cssprod', 'minifycss');
});


/**
 * JS ded & prod
 */


gulp.task('eslint', $.shell.task('eslint . --color', { ignoreErrors: true }));
gulp.task('watchify', ['serve'], function() {
    var watcher = watchify(browserify({
        entries: [path.SRC + 'app.jsx'],
        transform: [
            ["babelify", { presets: ['es2015', 'react'] }]
        ],
        debug: true
    }));



    return watcher.on('update', function() {
            var updateStart = Date.now();
            $.util.log($.util.colors.green('Updating main.js ...'));
            watcher.bundle()
                .on('error', function(err) {
                    $.util.log($.util.colors.red(err.message));
                    $.util.beep();

                    if (err.fileName) {
                        // regular error
                        $.util.log(chalk.red(err.name) +
                            ': ' +
                            chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) +
                            ': ' +
                            'Line ' +
                            chalk.magenta(err.lineNumber) +
                            ' & ' +
                            'Column ' +
                            chalk.magenta(err.columnNumber || err.column) +
                            ': ' +
                            chalk.blue(err.description))
                    } else {
                        // browserify error..
                        $.util.log(chalk.red(err.name) +
                            ': ' +
                            chalk.yellow(err.message));
                    }

                    this.emit('end');
                })
                .pipe(sourceStream('main.js'))
                .pipe(gulp.dest(path.DIST));
            $.util.log($.util.colors.green('Updated!', (Date.now() - updateStart) + 'ms'));
        })
        .bundle()
        .on('error', function(err) {


            $.util.log($.util.colors.red(err.message));
            $.util.beep();
            this.emit('end');
        })
        .pipe(sourceStream('main.js'))
        .pipe(gulp.dest(path.DIST));
});

gulp.task('browserify', function() {
    return browserify({
            entries: path.SRC + 'app.jsx',
            transform: [reactify, { 'es6': true }],
            extensions: ['.jsx', '.js'],
            debug: true
        })
        .bundle()
        .pipe(sourceStream('main.js'))
        .pipe(gulp.dest(path.DIST));
});


gulp.task('uglify', () => {
    return gulp.src(path.DIST + '*.js')
        .pipe($.uglify())
        .pipe(gulp.dest(path.DIST));
});

gulp.task('js', ['watchify']);

gulp.task('jsProd', () => {
    return runSequence('browserify', 'uglify');
});



/**
 * React Util Tasks
 */

gulp.task('cleanDist', (done) => {
    del([path.DIST], done);
});

gulp.task('serve', () => {
    exec('node server/app.js');
});

gulp.task('gzip', () => {
    return gulp.src(path.DIST + '**/*.{html,xml,json,css,js}')
        .pipe($.gzip())
        .pipe(gulp.dest(path.DIST));
});


/**
 * Default Tasks
 */
gulp.task('default', function() {
    runSequence('cleanDist', ['css', 'js'], 'serve');
});

gulp.task('deploy', function() {
    if (process.env.NODE_ENV === 'production') {
        runSequence('production')
    }
});

gulp.task('production', function() {
    runSequence('cleanDist', ['html', 'cssProd', 'jsProd', 'assetsProd']);
});

// Debug only JS
//ulp.task('default', ['lint'], () => {});