const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')

function Router() {
  this.stack = []
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    const route = new Route()

    // layer的 handler 就是 route的dispacth函数,递归调用 route的 stack 中间件
    // 这样 其实第一层的 layer.handler 没有具体的 处理函数，而是触发调用的函数
    const layer = new Layer(path, route.dispatch.bind(route))
    // 将route 挂载到 layer上
    layer.route = route
    this.stack.push(layer)
    // 将处理函数挂在到 layer.route 中。  path handlers
    route[method](path, handlers)
  }
})

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url)

  let index = 0
  const next = () => {
    if (index >= this.stack.length) {
      return res.end(`Can not get ${pathname}`)
    }

    const layer = this.stack[index++]
    const match = layer.match(pathname)
    if (match) {
      req.params = req.params || {}
      Object.assign(req.params, layer.params)
    }
    // 顶层只判定请求路径，内层判定请求方法
    if (match) {
      // 顶层这里调用的 handler 其实就是 dispatch 函数
      return layer.handler(req, res, next)
    }
    next()
  }

  next()

  // const layer = this.stack.find(layer => {
  //   // const keys = []
  //   // const regexp = pathRegexp(layer.path, keys, {})
  //   const match = layer.match(pathname)
  //   if (match) {
  //     req.params = req.params || {}
  //     Object.assign(req.params, layer.params)
  //   }
  //   return match && layer.method === method
  // })
  // if (layer) {
  //   return layer.handler(req, res)
  // }
  // res.end('404 Not Found.')
}

module.exports = Router
