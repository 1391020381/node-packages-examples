const express = require('express')
const app = express()
const protectCfg = {
    production: process.env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
    clientRetrySecs: 1, // Retry-After header, in seconds (0 to disable) [default 1]
    sampleInterval: 5, // sample rate, milliseconds [default 5]
    maxEventLoopDelay: 42, // maximum detected delay between event loop ticks [default 42]
    maxHeapUsedBytes: 0, // maximum heap used threshold (0 to disable) [default 0]
    maxRssBytes: 0, // maximum rss size threshold (0 to disable) [default 0]
    errorPropagationMode: false, // dictate behavior: take over the response 
    // or propagate an error to the framework [default false]
    logging: false, // set to string for log level or function to pass data to
    logStatsOnReq: false // set to true to log stats on every requests
}
const protect = require('overload-protection')('express', protectCfg)

app.use(protect)


app.get('/', function (req, res) {
    res.send('content')
})

app.listen(3000, function () {
    var req = require('http').get('http://localhost:3000')
    req.on('response', function (res) {
        console.log('got status code', res.statusCode)
        console.log('protect.overload after load', protect.overload)
        console.log('retry after', res.headers['retry-after'])

        setTimeout(function () {
            console.log('protect.overload after load', protect.overload)
            var req = require('http').get('http://localhost:3000')

            req.on('response', function (res) {
                console.log('got status code', res.statusCode)

                protect.stop()
                process.exit()
            }).end()
        }, parseInt(res.headers['retry-after'], 10))
    }).end()

    setImmediate(function () {
        console.log('eventLoopDelay after active sleeping', protect.eventLoopDelay)
    })

    sleep(500)
})

function sleep(msec) {
    var start = Date.now()
    while (Date.now() - start < msec) { }
}
