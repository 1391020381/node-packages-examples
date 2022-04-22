var fs = require('fs');
var path = require('path');
var writeStream = fs.createWriteStream(path.join(__dirname, '../extra/fileForWrite.txt'), 'utf-8')


writeStream.on('close', function () {
    console.log('已经关闭')
})
writeStream.write('hello');
writeStream.write('world');
writeStream.end('')