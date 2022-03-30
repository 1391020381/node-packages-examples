// min-koa
const http = require('http')

class Application {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer((req, res) => {
            // 构造 Context 对象
            const ctx = new Context(req, res)
            /// 
            this.middleware(ctx)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    // zai koa  app.callback() 将返回的Node HTTP API 标准的 handleRequest函数,方便测试
    callback() {
        return async (req, res) => {
            const ctx = new Context(req, res)

            // 使用 compose 合成所有中间件,在中间件中会做一些
            // 路由解析
            // Body 解析
            // 异常处理
            // 统一认证
            // 
            const fn = compose(this.middlewares)
            try {
                await fn(ctx)
            } catch (e) {
                // 最基本的异常处理上报 在实际生产环境中,将由一个专业的异常处理中间件来代理,同时也会做
                // 确认异常级别
                // 异常上报
                // 构造与异常对应的状态码  
                ctx.res.statusCode = 500
                ctx.res.end('Internel Server Error')
            }
            ctx.res.end(ctx.body)
        }
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
}
class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}
// compose 传入 middlwares 返回一个 递归函数
function compose(middlewares) {
    return ctx => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if (i === middleware.length) {
                return
            }
            // app.use((ctx,next)=>{})
            // 取出当前中间件，并执行
            // 当在中间件中调用 next() 时 将控制权交给下个中间件
            // 如果中间件没有调用 next() 则接下来的中间件将不会执行
            // Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            return middleware(ctx, () => dispatch(i + 1))
        }
        return dispatch(0)
    }
}
module.exports = Application