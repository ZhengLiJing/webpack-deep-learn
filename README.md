#### webpack命令行打包
	webpack@1.13.2
	
	1. basic： webpack hello.js hello-bundle.js
	2. use loders: webpack hello.js hello-bundle.js --module-bind 'css=style-loader!css-loader'
	3. use --watch(-w): webpack hello.js hello-bundle.js -w
	4. use --progress: webpack hello.js hello-bunlde.js --progress
	5. use --display-modules: webpack hello.js hello-bundle.js --display-modules
	6. use --display-modules display-reasons: webpack hello.js hello-bundle.js --display-modules display-reasons

#### webpack.config.js配置文件
	1. webpack默认使用webpack.config.js配置文件，当然也可以使用--config指定其他的配置文件，即:
	webpack --config my-webpack.config.js
	2. 当想和命令行打包一样加入一些命令行参数怎么办？可以在package.json里的script标签下创建脚本
	   "script": {
	   		"webpack": "webpack --config webpack.config.js --progress -w --display-modules --colors"
	   }
	3. [hash]:本次打包生成的hash值
	   [chunkhash]:每个块的hash（版本号）,类似于文件内容的md5值，只有当文件内容发生变化时，该值才会改变
```
// 这里引入的.js文件是固定的，但是我们每次打包后.js文件名可能不一样，比如使用了[hash]或者[chunk-hash],
// 那显然每次手动引入简直是反人类。有什么办法呢？
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./hello-bundle.js"></script>
</head>
<body>
    
</body>
</html>
```		
```
	// 使用html-webpack-plugin,传入的参数直接是template: 'index.html'，路径对吗？
	// 这里其实Webpack有一个上下文的属性，其值就是我们运行脚本的目录
	module.exports = {
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	};
```
```
module.exports = {
	output: {
		path: path.resolve('./dist'),
		filename: 'js/[name]-[chunkhash].js'
	}
};
```
```
	var HtmlWebpackPlugin = require('html-webpack-plugin'); 这个变量随意。

但是在模板中<title><%= htmlWebpackPlugin.options.title %></title>必须使用驼峰式命令。不然会报错一直提示这个插件未定义。这是一个坑啊。弄了好久才知道。谢谢下面同学的解答。

```