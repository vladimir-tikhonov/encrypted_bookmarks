const path = require('path');
const webpack = require('webpack');

const { SOURCE_PATH, BUILD_PATH } = require('./common.js');

module.exports = {
    entry: [
        path.join(SOURCE_PATH, 'scripts', 'vendors.js'),
    ],

    output: {
        path: BUILD_PATH,
        filename: 'vendors.js',
        library: 'vendors',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(BUILD_PATH, 'vendors-manifest.json'),
            name: 'vendors',
        }),
    ],
};
