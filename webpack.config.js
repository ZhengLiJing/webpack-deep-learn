const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        a: './src/script/a.js',
        main: './src/script/main.js',
        b: './src/script/b.js',
        c: './src/script/c.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://cdn.com'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: false,
            title: 'this is a.html',
            filename: 'a.html',
            excludeChunks: ['b', 'c'],
            minify: {
                collapseWhitespace: true
            }
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: false,
            title: 'this is b.html',
            filename: 'b.html',
            excludeChunks: ['a', 'c'],
            minify: {
                collapseWhitespace: true
            }             
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: false,
            title: 'this is c.html',
            filename: 'c.html',
            excludeChunks: ['a', 'b'],
            minify: {
                collapseWhitespace: true
            }     
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    ]
};