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
        /\.src\//这样就能提升一半速度了
        此时打包时间为：359ms

#### 打包失败

    // webpack 1.x
    原因：include使用的方式不对，
    错误：include: 'src'
    正确: include: /src/

#### babel 的 presets 的位置

    // webpack 1.x
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
