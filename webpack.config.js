const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		bundle: './src/js/index.js',
		iostatus: './src/js/iostatus.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/scripts/js'),
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [ MiniCssExtractPlugin.loader, { loader: 'css-loader' }, { loader: 'sass-loader'} ]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: '../css/bundle.css'
		}),
	]
};