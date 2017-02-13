const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')
var mongoose = require('mongoose')
var Support = require('./support.model');
var path = require('path');
var express = require('express')
var app = express();

mongoose.connect(process.env.MONGODB);

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))

app.set('port', process.env.PORT || 8000);
app.set('host', process.env.HOST || 'localhost');

app.listen(app.get('port'), function(){
  console.log('server listening on 8000')
});
app.get('/',function(req, res){
    res.send('welcome')
})
//get the amount of supports from database
app.get('/api/getSupport', function(req, res){
  Support.findOne({supportID:1}, function(err, support){
    if (err){
      console.log(err)
    }
    else if(support == null){
      res.status(404).json('not found');
    }
    else{
      res.status(200).json(support)
    }
  })
})
//add one more support to the database
app.get('/api/makeSupport', function(req, res){
  Support.findOne({supportID: 1}, function(err, support){
    if (err){
        console.log(err)
    }
    else if(support == null){
      res.status(404).json('not found');
    }
    else{
      support.supports += 1
      Support.update({supportID:1}, {supports: support.supports}, function(err, newSupport){
        if (err){
          console.log(err)
        }
        else{
          res.status(200).json(support)
        }
      })
    }
  })
})
