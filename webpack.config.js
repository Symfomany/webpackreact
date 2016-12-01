let util = require('util');

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

let opn = require('opn'); // open in browser
let pkg = require('./package.json'); // load package.json for constants

// access letiables from package.json
let port = pkg.config.devPort;
let host = pkg.config.devHost;

// Get Environement pf NODE (development or production)
let configPath = process.argv[2] || './webpack/webpack.config';
let config = require(configPath);


/**
 * webpack-dev-server
 * Load Server Webpacl=k with configuration Webpack loaded
 */
let server = new WebpackDevServer(
    webpack(config),
    config.devServer
);

/**
 * Launch webpack in port 
 */
server.listen(port, host, function(err) {
    if (err) { console.log(err); }
    let url = util.format('http://%s:%d', host, port);
    console.log('Listening at %s', url);
    opn(url);
});