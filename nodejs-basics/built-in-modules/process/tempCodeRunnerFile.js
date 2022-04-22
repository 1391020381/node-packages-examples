var cluster = require('cluster');
var http = require('http')
var cupNums = require('os').cpus().length

console.log('cupNums:', cupNums)

if (cluster.isMaster) {
    for (var i = 0; i < cupNums; i++) {
        cluster.fork();
    }
} else {
    http.createServer(function (req, res) {
        res.end(`response from worker ${process.pid}`)
    }).listen(8989)
    console.log(`Worker ${process.pid} stared`)
}