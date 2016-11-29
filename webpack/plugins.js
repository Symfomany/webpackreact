var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var pkg = require('../package.json');

var DEBUG = process.env.NODE_ENV === 'development';

var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin()

];
if (DEBUG) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = plugins;