'use strict';

var mongoose = require('mongoose');

var SupportSchema = new mongoose.Schema({
  supportID:Number,
  supports: Number,
});
var Support = mongoose.model('500pxSupport', SupportSchema);
module.exports = Support;
