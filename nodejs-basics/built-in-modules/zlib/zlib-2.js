var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var gunzip = zlib.createGunzip();

var inFile = fs.createReadStream(path.join(__dirname, '../extra/fileForCompress.txt.gz'))
var outFile = fs.createWriteStream(path.join(__dirname, '../extra/fileForCompress-ungz.txt'))

inFile.pipe(gunzip).pipe(outFile)