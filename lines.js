var through = require('through2');
var stream = through(write, end);
var split = require('split');

var upper = false;

function write(buf, encoding, next){
  var str = buf.toString();
  if (upper)
  {
    this.push(str.toUpperCase());
    upper = false;
  }
  else
  {
    this.push(str.toLowerCase());
    upper = true;
  }
  this.push('\n');
  next();
}

function end(done){
  done();
}

process.stdin.pipe(split()).pipe(stream).pipe(process.stdout);