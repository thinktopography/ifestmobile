const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('public'),
    filename: './js/application-[hash].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?+babelrc,+cacheDirectory'
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(['css-loader','postcss-loader','less-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/styles-[hash].min.css'),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public', 'index.html'),
      template: path.resolve(__dirname, 'src', 'index.html'),
      title: 'reframe'
    })
  ]
})
