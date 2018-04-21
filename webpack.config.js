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
                // include: /\.src\//,
                // include: /src/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }
        ]
    },
    postcss: [
        require('autoprefixer')({
            browsers: ['last 5 version']
        })
    ],
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            title: 'webpack is very nice',
            filename: 'index.html'
        })
    ]
};