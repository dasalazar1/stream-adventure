var http = require('http');
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

var server = http.createServer(function (req, res) {
  req.pipe(stream).pipe(res);
});
server.listen(process.argv[2]);