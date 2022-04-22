var http = require('http');
var zlib = require('zlib');
var fs = require('fs');
var path = require('path');

var filepath = path.join(__dirname, '../extra/fileForGzip.html');

var server = http.createServer(function (req, res) {
    var acceptEncoding = req.headers['accept-encoding']
    console.log('acceptEncoding:', acceptEncoding)
    var gzip;
    if (acceptEncoding.indexOf('gzip') != -1) {
        gzip = zlib.createGzip();
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        })
        fs.createReadStream(filepath).pipe(gzip).pipe(res)
    } else {
        fs.createReadStream(filepath).pipe(res)
    }
})
server.listen(8989, () => {
    console.log('server is listening 8989')
})
