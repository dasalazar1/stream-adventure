var duplexer = require('duplexer2');
var through = require('through2');

module.exports = function (counter) {

  var stream = through({ objectMode: true }, write, end);
  var countryCounts = {}

  function write(obj, encoding, next){
    if( countryCounts.hasOwnProperty(obj.country) )
    {
      countryCounts[obj.country]++;
    }
    else
    {
      countryCounts[obj.country] = 1;
    }
    next();
  }

  function end(){
    counter.setCounts(countryCounts);
  }
  return duplexer({objectMode: true}, stream, counter);
};
