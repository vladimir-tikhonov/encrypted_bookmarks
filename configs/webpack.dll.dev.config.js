const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.join(__dirname, '..');
const SOURCE_PATH = path.join(ROOT_PATH, 'src');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

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
