var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer-core');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');

// Load dev en
var DEBUG = process.env.NODE_ENV === 'development';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));


/**
 * Point of entry
 */
var entry = {
    app: ['./app.jsx']
};

// Debug on port dev with host
if (DEBUG) {
    entry.app.push(
        util.format(
            'webpack-dev-server/client?http://%s:%d',
            pkg.config.devHost,
            pkg.config.devPort
        )
    );
    entry.app.push('webpack/hot/dev-server');
}

/**
 * All Configuration of Webpack
 */
var config = {
    context: path.join(__dirname, '../app'),
    cache: DEBUG,
    debug: DEBUG,
    target: 'web',
    devtool: 'source-map',
    entry: entry,
    output: {
        path: path.resolve(pkg.config.buildDir),
        publicPath: '/',
        filename: jsBundle,
        pathinfo: false
    },
    module: {
        loaders: loaders
    },
    postcss: [
        autoprefixer
    ],
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },
    // Load dev configuration with HOT, stats, verbose infos...
    devServer: {
        contentBase: path.resolve(pkg.config.buildDir),
        hot: true,
        noInfo: false,
        inline: true,
        stats: { colors: true }
    }
};

module.exports = config;