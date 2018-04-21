#### ES6 to ES5

       // 使用的开发依赖：
        "devDependencies": {
            "babel-core": "^6.18.0",
            "babel-preset-latest": "^6.16.0",
            "clean-webpack-plugin": "^0.1.15",
            "css-loader": "^0.26.2",
            "html-webpack-plugin": "^2.22.0",
            "style-loader": "^0.13.2",
            "webpack": "^1.15.0"
        }
        从依赖中可以看出 webpack 的版本才 1.x,现在都 4.x 了。
        webpack.config.
        // webpack 1.x 版本的配置
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['latest']
                    }
                }
            ]
        }
        // webpack 4.x 版本的配置,不在使用 query 配置转换待转换的 js 代码，
        // 而是使用 options 代替
        // 或者直接在.babelrc 配置文件中配置
        module: {
            rules: [
                {
                    test: /\.js$/,
                    options: {
                        loaders: 'babel-loader',
                        presets: ['env']
                    }
                }
            ]
        }

#### 打包时间

        没有使用 babel-loader 的 exclude 和 include 配置选项打包花费的时间
        4546ms,还是很慢的。使用了 exclude 选项，打包的时间为：4871ms,
        我擦，竟然增加了，原因是我们开发代码现如今并没有使用到 node_modues
        里的包，排除了它也没差。使用 include 选项，打包的时间为:366ms,果然时间减少了。

| Time       | time   |
| ---------- | ------ |
| no include | 4871ms |
| include    | 366ms  |

        webpack 2.x版本中include值如果是字符串的话用相对路径'./src'会报错，
        必须用path.resolve(__dirname, 'src')。但我们可以用正则：
        /\.src\//这样就能提升一半速度了，
        此时打包时间为：359ms
        但是转换没有成功,原因是这个正则没有匹配到src
        换成include: /src/后，转换成功,
        换成include: path.resolve(__dirname, 'src')同样成功转换。

#### 打包失败

    // webpack 1.x
    原因：include使用的方式不对，
    错误：include: 'src'
    正确: include: /src/

#### babel 的 presets 的位置

    // webpack 1.x
    // cnpm i -D babel-preset-latest@6.16.0 babel-core@6.18.0
    1. 直接在loders里，即
    loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['latest']
                    }
                }
            ]

#### postcss-loader

    // webpack 1.x
    // cnpm i -D postcss-loader@1.1.0
    PostCSS is a CSS post-processing tool that can transform your CSS in a lot of cool ways, like autoprefixing, linting and more!
    // webpack 1.x使用
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
            }
        ]
    },
    postcss: [
        require('autoprefixer')({
            browsers: ['last 5 version']
        })
    ],
    1. post-loader配合插件autoprefixer给浏览器添加前缀
    2. @import引入的css文件，需要在css-loader添加参数?importLoaders=1,
        查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader。
            {
    test: /\.css$/,
    use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                }
            },
            'postcss-loader',
            'sass-loader'
        ]
    }

#### less-loader

    // webpack 1.x
    // cnpm i -D less-loader@2.2.3 less@2.3.1
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }
        ]
    }
    1. loaders: 'style!css!postcss!less',可以不添加-loader后缀
    2. less会处理@import的文件，所以不用css-loader不用使用查询参数importLoader=1

##### html-loader

    // webpack 1.x
    // cnpm i -D html-loader@0.4.4 ejs-loader@0.3.0
    module: {
        loaders: [

            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    }
    1. html-loader是将html作为字符串输出

#### ejs-loader 模板文件转换

    // webpack 1.x
    // cnpm i -D ejs-loader@0.3.0
    module: {
        loaders: [

            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            }
        ]
    }
    1. 使用模板引擎ejs，可以在html使用js,方式是使用<%= %>或<% %>包含
        <%= name %>
        <% for (var i = 0, len = array.length; i < len; i++) { %>
            <%= array[i] %>
        <% } %>

#### 图片资源打包

    // webpack 1.x
    // cnpm i -D file-loader@0.9.0
    1. css文件中引入图片
        + 可以使用绝对路径
        + 可以使用相对路径，file-loader可以识别
    2. index.html引入图片
        + 可以使用绝对路径
        + 可以使用相对路径，file-loader可以识别
    3. 模板文件中引入图片
        + 可以使用绝对路径
        + 使用相对路径时，图片加载失败，解决办法是使用require
            <img src="${require('../assets/icon.png')}" />

#### 内联图片 url-loader

    // webpack 1.x
    // cnpm i -D url-loader@0.5.7
    module: {
        loaders: [
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loader: 'url-loader?limit=17000'
                // loader: 'file-loader'
            }
        ]
    }
    1. 图片直接使用file-loader进行转化，会对图片进行单独打包，浏览器会进行缓存
                                   Asset       Size     Chunks             Chunk Names
    1f01b9d84a3cfba3832012b1108f41c9.png     16.2 kB          [emitted]
                            app-bundle.js    15.7 kB       0  [emitted]  app
                                index.html   436 bytes          [emitted]
    2. 使用url-loader的limit参数，图片小于limit时，会被编码成base64文件放入html中，
        但是浏览器不会进行缓存,会造成代码的冗余，增加代码的体积。

#### image-webpack-loader
    // webpac 1.x
    // cnpm i -D image-webpack-loader@2.0.0
    module: {
        {
            test: /\.(png|jpe?g|svg|gif)$/,
            loaders: [
                'url-loader?limit=1000&name=[name]-[hash:5].[ext]',
                'image-webpack-loader?optimizationLevel=7'
            ]
        }
    }
    1. 对要打包的图片进行压缩
