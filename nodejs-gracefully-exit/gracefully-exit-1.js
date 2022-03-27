const net = require('net');
const server = net.createServer().listen(80)
server.on('close', () => {
    process.exit()
})
// 防止进程提前挂掉

process.on('uncaughtException', () => {

})
process.on('SIGINT', function () {
    server.close()
})

const client = net.connect({ prot: 80 })