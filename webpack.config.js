const webpack = require('webpack');
const path = require('path');

const env = require('./utils/env.js');

module.exports = {
    devtool: 'inline-eval-source-map',

    entry: {
        popup: path.join(__dirname, 'src', 'scripts', 'popup.jsx'),
        options: path.join(__dirname, 'src', 'scripts', 'options.jsx'),
        background: path.join(__dirname, 'src', 'scripts', 'background.js'),
    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
    },

    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loader: 'babel-loader'},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
        ],
    },

    resolve: {
        alias: {
            scripts: path.resolve(__dirname, 'src', 'scripts'),
            styles: path.resolve(__dirname, 'src', 'styles'),
        },
        extensions: ['.js', '.jsx', '.css'],
    },
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env.NODE_ENV),
                PORT: JSON.stringify(env.PORT),
            },
        }),
    ],
};
