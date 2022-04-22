var dns = require('dns');
var options = { all: true }
dns.lookup('www.qq.com', options, function (err, address, family) {
    if (err) throw err;
    console.log('例子A:', address)
})