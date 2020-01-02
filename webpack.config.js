var webpack = require('webpack')
var path = require('path')
var UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
var config = require('./package.json')

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: __dirname+'/public/dist',
		filename: 'bundle/[name].js',
        sourceMapFilename: 'bundle/[name].map',
        chunkFilename: 'bundle/[name].js'
	},
	node: {
		fs: 'empty'
	},
	devtool: '#source-map',
	performance: process.env.NODE_ENV === 'production' ? {hints: false} : {},
	plugins: process.env.NODE_ENV === 'production' ? [
	    new webpack.DefinePlugin({
	        'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	        }
	    })
	] : [],
	optimization: process.env.NODE_ENV === 'production' ? {
		minimize: true,
		minimizer: [
			new UglifyJsWebpackPlugin({
				uglifyOptions: {
					output: {
						comments: false
					},
					compress: {
						drop_console: true,
						dead_code: true
					}
				}
			})
		]
	} : {
		minimize: false
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query:{
					presets:['react', 'env'],
					plugins: ['transform-object-rest-spread']
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]',
					outputPath: 'images/',
					publicPath: (config.server) ? '/' : 'public/dist/',
					useRelativePath: false
				}
			}
		]
	}
}
