'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
// const combineLoaders = require('webpack-combine-loaders');
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProduction ? 'production' : 'development',

	context: __dirname,

	entry: {
		main: [
			'babel-polyfill',
			path.resolve(__dirname, '../src/assets/scripts/main')
		]
	},

	output: {
		path: path.resolve(__dirname, '../public/assets/scripts'),
		publicPath: './assets/scripts',
		filename: '[name].js'
	},

	watch: !isProduction,

	watchOptions: {
		aggregateTimeout: 100,
		ignored: /node_modules/
	},

	devtool: !isProduction ? '#eval-source-map' : false,

	resolve: {
		modules: ['node_modules'],
		enforceExtension: false
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /(node_modules|bower_components)/,
				enforce: 'pre'
			},
			{
				test: /\.css?$/,
				include: /(node_modules|bower_components)/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components|formValidation)/,
				use: ['babel-loader']
			},
			{
				test: /\.(gif|png|jpg|svg|woff|ttf|eot|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: '[path][name].[ext]'
					}
				}
			},
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'common',
					chunks: 'all'
				}
			}
		}
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery/dist/jquery.min',
			jQuery: 'jquery/dist/jquery.min',
			'window.jQuery': 'jquery/dist/jquery.min'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV)
			}
		})
	]

}

