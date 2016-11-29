var util = require('util');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var opn = require('opn'); // open in browser
var pkg = require('./package.json'); // load package.json for constants

// access variables from package.json
var port = pkg.config.devPort;
var host = pkg.config.devHost;

// Get Environement pf NODE (development or production)
var configPath = process.argv[2] || './webpack/webpack.config';
var config = require(configPath);


/**
 * webpack-dev-server
 * Load Server Webpacl=k with configuration Webpack loaded
 */
var server = new WebpackDevServer(
    webpack(config),
    config.devServer
);

/**
 * Launch webpack in port 
 */
server.listen(port, host, function(err) {
    if (err) { console.log(err); }
    var url = util.format('http://%s:%d', host, port);
    console.log('Listening at %s', url);
    opn(url);
});