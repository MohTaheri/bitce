var express = require('express')
  , fs 		= require('fs')	
  , config  = require('./config/config')
  // , mongoose = require('mongoose')


// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = express()

require('./config/express')(app, config)
require('./config/routes')(app)

var port = 8080
app.listen(port)
console.log("Express App started on port " + port)

exports = module.exports = app