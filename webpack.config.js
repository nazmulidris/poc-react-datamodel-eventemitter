const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack           = require('webpack')

module.exports = () => ({
  entry    : './src/index.js',
  output   : {
    path    : path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module   : {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'},
      {test: /\.css$/, use: ["style-loader", "css-loader"]}
    ]
  },
  mode     : 'development',
  devtool  : 'source-map',
  devServer: {
    contentBase       : path.join(__dirname, 'dist'),
    publicPath        : 'http://localhost:8000/',
    compress          : true,
    port              : 8000,
    hot               : true,
    historyApiFallback: true
  },
  plugins  : [
    new HtmlWebpackPlugin({
                            template: 'src/index.html'
                          })
  ]
})