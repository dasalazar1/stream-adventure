var combine = require('stream-combiner')
var through = require('through2');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
  var shelf = [];

  var stream = through( write, end);
  function write(buf, encoding, next){
    var str = buf.toString();
    if (str !== '')
    {
      var obj = JSON.parse(str);
      if(obj.type == 'genre')
      {
        // if(shelf.length > 0) 
        //   this.push(JSON.stringify(shelf[shelf.length - 1])+"\n");
        shelf.push({name: obj.name, books: []});
      }
      else
      {
        shelf[shelf.length - 1].books.push(obj.name);
      }
        
    }
    //console.log(shelf);
    next();
  }
  
  function end(done){
    var str = '';
    shelf.forEach( function( genre ){
      str += JSON.stringify(genre)+ '\n';
    });
    done(undefined, str);
  }

  return combine(
    split(),
    stream,
    zlib.createGzip()
    );
}