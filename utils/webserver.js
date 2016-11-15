const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');
const path = require('path');

require('./prepare');
require('./prepare_script_tags');

config.entry['webpack-server'] = ('webpack-dev-server/client?http://localhost:' + env.PORT);

for (var entryName in config.entry) {
    config.entry[entryName] = ['webpack/hot/dev-server'].concat(config.entry[entryName]);
}

config.output.pathinfo = true;
config.output.publicPath = ('http://localhost:' + env.PORT + '/');

config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: path.join(__dirname, '../build'),
    headers: {'Access-Control-Allow-Origin': '*'},
});

server.listen(env.PORT);
