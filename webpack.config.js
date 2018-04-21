const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // query: {
                //     presets: ['latest']
                // },
                include: /\.src\//,
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            title: 'webpack is very nice',
            filename: 'index.html'
        })
    ]
};