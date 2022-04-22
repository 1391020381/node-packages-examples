var fs = require('fs');
var zlib = require('zlib');
var path = require('path')
var gzip = zlib.createGzip();
var inFile = fs.createReadStream(path.join(__dirname, '../extra/fileForCompress.txt'))
var out = fs.createWriteStream(path.join(__dirname, '../extra/fileForCompress.txt.gz'))

inFile.pipe(gzip).pipe(out)