const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css',
  'postcss-loader',
  'sass?includePaths[]=' + (path.resolve(__dirname, './node_modules'))
];

module.exports = {
  'devtool': 'source-map',
  'entry': [
    './src/index.js'
  ],
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot!babel'
    }, {
      'test': /\.css$/,
      'loader': 'style!css!postcss'
    }, {
      'test': /\.scss$/,
      'loader': ExtractTextPlugin.extract('style', sassLoaders.join('!'))
    }]
  },
  'resolve': {
    'extensions': ['', '.js', '.scss']
  },
  'output': {
    'path': path.resolve(__dirname, './dist'),
    'publicPath': '/',
    'filename': 'bundle.js'
  },
  'devServer': {
    'contentBase': './dist',
    'hot': true
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      'compressor': {
        'warnings': false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  postcss() {
    return [autoprefixer({
      'browsers': [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    })];
  }
};
