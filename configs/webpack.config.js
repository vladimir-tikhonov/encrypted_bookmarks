const webpack = require('webpack');
const path = require('path');

const env = require('../utils/env.js');

const ROOT_PATH = path.join(__dirname, '..');
const SOURCE_PATH = path.join(ROOT_PATH, 'src');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

module.exports = {
    devtool: 'inline-eval-source-map',

    entry: {
        popup: path.join(SOURCE_PATH, 'scripts', 'popup.jsx'),
        options: path.join(SOURCE_PATH, 'scripts', 'options.jsx'),
        background: path.join(SOURCE_PATH, 'scripts', 'background.js'),
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
                loaders: ['style-loader', 'css-loader'],
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env.NODE_ENV),
            },
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(BUILD_PATH, 'dll', 'manifest.json'),
        }),
    ],
};
