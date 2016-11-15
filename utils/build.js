const webpack = require('webpack');
const config = require('../webpack.config');

require('./prepare');

webpack(config, (error) => {
    throw error;
});
