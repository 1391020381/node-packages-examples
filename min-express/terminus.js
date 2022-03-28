const http = require('http');
const express = require('express')
const { createTerminus } = require('@godaddy/terminus')
const app = express()

app.get('/', (req, res) => {
    res.end('ok')
})

const server = http.createServer(app)

function onSignal() {
    console.log('server is starting cleanup')
    // start cleanup of resource,like database or file descriptors
    process.exit(0)
}

async function onHealthCheck() {
    // checks if the system is healthy,like the db connecttion is live
    // resolves,if health rejects if not 

}

createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
})

server.listen(3000)