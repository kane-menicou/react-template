'use strict'

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const babelConfig = require('./babel')

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, '..', 'src', 'index.html'),
  filename: './index.html',
})

module.exports = {
  output: {
    path: path.resolve('public'),
    filename: 'app.js',
  },
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              ...babelConfig,
            },
          },
        ],
      },
      {
        test: /\.(s([ca])ss)/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '',
              name: '[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
}
