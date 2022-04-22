var fs = require('fs');
var path = require('path');
var readSream = fs.createReadStream(path.join(__dirname, '../extra/fileForRead.txt'), 'utf-8')

readSream.on('data', function (chunk) {
    console.log('读取数据:', chunk)
}).on('error', function (err) {
    console.log('出错:', err.message)
}).on('end', function () {
    console.log('没有数据了');
}).on('close', function () {
    console.log('已经关闭')
})