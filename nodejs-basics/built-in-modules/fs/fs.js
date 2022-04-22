var fs = require('fs');
var path = require('path');

fs.readFile(path.join(__dirname, '../extra/fileForRead.txt'), 'utf-8', function (err, data) {
    if (err) {
        return console.error('读取文件出错:', err.message)
    }
    console.log('文件内容:', data)
})