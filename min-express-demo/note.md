# Application
# Router
* 创建 Application 实例的时候, 会生成一个 Router 实例 并保存在 this_router 上
* this._router = new Router()
* app.use() 挂载应用级别路由
# Route
* 在 Router中使用 route  挂载路由级别的中间件
* 路由级别中间件, router.route('/',function(req,res,next){})
* router.route() 实际上 也是 把 layer 添加到当前 Router实例上。 最后使用 use注册
# Layer
* 对中间件的一层抽象
* 保存 path   handler  并通过 pathToRegexp 方法 判断传入的 URL 是否匹配当前的 中间件