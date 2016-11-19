const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const { SOURCE_PATH, BUILD_PATH } = require('./common.js');

module.exports = {
    entry: {
        popup: path.join(SOURCE_PATH, 'scripts', 'popup.jsx'),
        options: path.join(SOURCE_PATH, 'scripts', 'options.jsx'),
    },

    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    SOURCE_PATH,
                ],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: '/tmp',
                },
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader'],
                }),
            },
        ],
    },

    resolve: {
        alias: {
            scripts: path.resolve(SOURCE_PATH, 'scripts'),
            styles: path.resolve(SOURCE_PATH, 'styles'),
        },
        extensions: ['.js', '.jsx', '.css'],
    },

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.join(BUILD_PATH, 'dll', 'manifest.json'),
        }),
        new ExtractTextPlugin('[name].css'),
    ],
};
