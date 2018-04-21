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
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loaders: ['url-loader?limit=1000&name=[name]-[hash:5].[ext]',
                'image-webpack-loader?optimizationLevel=7']
                
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