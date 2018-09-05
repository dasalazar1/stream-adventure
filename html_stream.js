var trumpet = require('trumpet');
var fs = require('fs');
var tr = trumpet().select('.loud').createStream();

var through = require('through2');
var stream = through(write, end);

function write(buf, encoding, next){
  var str = buf.toString();
  this.push(str.toUpperCase());
  next();
}

function end(done){
  done();
}


process.stdin.pipe(tr).pipe(stream).pipe(process.stdout);