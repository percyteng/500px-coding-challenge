const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')

var path = require('path');

var express = require('express')
var app = express();

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || 'localhost');

app.listen(app.get('port'), function(){
  console.log('server listening on 4000')
});
