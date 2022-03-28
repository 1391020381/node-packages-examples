const express = require('express')
const app = express()
const port = 3000
var router = express.Route()
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

app.use('/', function (req, res) {
    console.log(req.path, 'path')
    res.end('Hello,World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})