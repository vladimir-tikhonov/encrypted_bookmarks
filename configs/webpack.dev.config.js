const sharedConfig = require('./webpack.shared.config.js');

sharedConfig.devtool = 'eval-source-map';

module.exports = sharedConfig;
