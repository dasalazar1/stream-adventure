var concat = require('concat-stream');

function reverse(buf){
  console.log( buf.reverse().toString() );
}

process.stdin.pipe(concat(reverse))