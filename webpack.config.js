var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var extractCSS = new ExtractTextPlugin('styles.css',{
  allChunks:true
});

module.exports = {
  entry: process.env.NODE_ENV === 'production' ? ['./src'] : ['./src','webpack-hot-middleware/client?reload=true'],

  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'source-map',
  output: {
    path:path.resolve('public'),
    filename: 'scripts/bundle.js',
    publicPath: '/'
  },

  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: process.env.NODE_ENV==='production'? ['es2015','react'] : ['es2015','react']
        }
      },
      {
          test: /\.scss$/,
          loader: extractCSS.extract(['css','sass'])
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS
  ] : [
    extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
