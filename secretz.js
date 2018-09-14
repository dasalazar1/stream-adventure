var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var concat = require('concat-stream');


var stream = crypto.createDecipher( process.argv[2], process.argv[3], null);
var gunzip = zlib.createGunzip();
var parser = new tar.Parse();

parser.on('entry', function(entry){
  //console.log(entry.type);

  if(entry.type === 'File')
  {
    var hash = crypto.createHash('md5', {encoding: 'hex'});
    entry.pipe(hash).pipe(concat(function(hash){
      console.log(hash + ' ' + entry.path)
    }));
  }
  else{
    return entry.resume();
  }

});

process.stdin.pipe(stream).pipe(gunzip).pipe(parser);



