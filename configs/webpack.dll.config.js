const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        path.join(__dirname, '..', 'src', 'scripts', 'vendors.js'),
    ],

    output: {
        path: path.join(__dirname, '..', 'build', 'dll'),
        filename: 'dll.js',
        library: 'dll',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', 'build', 'dll', 'manifest.json'),
            name: 'dll',
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
};
