const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        a: './src/script/a.js',
        main: './src/script/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            title: 'webpack is very nice'
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    ]
};