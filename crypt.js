var crypto = require('crypto');
var stream = crypto.createDecipher('aes256', process.argv[2], null);

process.stdin.pipe(stream);
stream.pipe(process.stdout);