/*
 * Copyright 2020 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      // TypeScript support.
      {test: /\.ts(x?)$/, exclude: /node_modules/, use: [{loader: "ts-loader"}]},
      // All output '.js' files will have any sourcemaps re-processed by
      // 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
      {test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.css$/, use: ["style-loader", "css-loader"]},
      {test: /\.(jpg|png|svg)$/, use: 'url-loader'},
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:8000/',
    compress: true,
    port: 8000,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
})