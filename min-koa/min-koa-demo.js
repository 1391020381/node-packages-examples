const Application = require('./index.js')
const app = new Application()

app.use((ctx) => {
    ctx.body = 'hellow,min-koa'
})
app.listen(3000, () => {
    console.log('server is listening 3000')
})