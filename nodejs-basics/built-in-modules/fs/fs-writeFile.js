var fs = require('fs');
var path = require('path');
fs.writeFile(path.join(__dirname, '../extra/fileForWrite.txt'), '行云流水justdoit', 'utf-8', function (err) {
    if (err) throw err;
    console.log('文件写入成功')
})