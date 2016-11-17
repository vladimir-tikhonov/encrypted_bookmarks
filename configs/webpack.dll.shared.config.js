const path = require('path');
const webpack = require('webpack');

const {SOURCE_PATH, BUILD_PATH} = require('./common.js');

module.exports = {
    entry: [
        path.join(SOURCE_PATH, 'scripts', 'vendors.js'),
    ],

    output: {
        path: path.join(BUILD_PATH, 'dll'),
        filename: 'dll.js',
        library: 'dll',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(BUILD_PATH, 'dll', 'manifest.json'),
            name: 'dll',
        }),
    ],
};
