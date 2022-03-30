import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa()

const route = new Router()
route.get('/', async (ctx, next) => {
    ctx.body = 'hello,ts-koa';
})

app.use(route.routes())

app.listen(3000, () => {
    console.log('server is listening 3000')
})