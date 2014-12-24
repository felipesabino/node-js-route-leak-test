var express = require('express');

var memwatch = require('memwatch');
memwatch.on('leak', function(info) { console.log(JSON.stringify(info))});

var app = express();

app.listen(9001);

var handle = function(req, res, callback) {

  var bigObject = {};
  for(var i=0; i < 1000; i++) {
    bigObject[i] = {
      "key": i
    }
  }
  var noop = function() {}
  setTimeout(function() {
    noop(bigObject);
    bigObject = null;
    if(callback) {
      callback();
    }
  }, 1000)
}

app.get('/leak', function(req, res) {
  handle(req, res);
  res.json(200, {});
});
app.get('/no-leak', function(req, res) {
  handle(req, res, function() {
    res.json(200, {});
  });
});
