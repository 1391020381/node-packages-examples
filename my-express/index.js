const express = require('express')
const app = express()

app.get('/hello', (req, res) => {
    res.end('hello,express');
})

app.listen(9000, () => {
    console.log('server is listening 9000')
})