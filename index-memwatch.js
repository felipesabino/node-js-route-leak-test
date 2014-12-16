var express = require('express');
var memwatch = require('memwatch');

memwatch.on('leak', function(info) { console.log(JSON.stringify(info))});

var app = express();

app.listen(9001);

app.get('/leak', function(req, res) {
  var noop = function() {}
  var bigObject = {};
  for(var i=0; i < 100; i++) {
    bigObject[i] = {
      "key": i
    }
  }
  setTimeout(function() {
    noop(bigObject);

    // uncomment me for no leak?
    res.json(200, {});
  }, 1000)

  // uncomment me for leak?
  // res.json(200, {});

})
