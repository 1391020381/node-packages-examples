const express = require('express')
const app = express()
const port = 3000
var router = express.Route()
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})
app.get('/', (req, res) => {
    res.end('Hello,World!')
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})