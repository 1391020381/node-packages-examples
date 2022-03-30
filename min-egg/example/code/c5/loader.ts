import * as fs from 'fs';
import { BaseContext } from 'koa';
import * as Router from 'koa-router';
export class Loader {
    router: Router = new Router()
    controller: any = {}
    loadController() {
        const dirs = fs.readdirSync(__dirname + '/controller');
        console.log('dirs:', dirs)
        dirs.forEach(filename => {
            const property = filename.split('.')[0] // user
            const mod = require(__dirname + '/controller/' + filename).default
            console.log(__dirname + '/controller/' + filename, 'xxxxx')
            console.log('mod:', mod)
            if (mod) {
                // methodNames 对应 controller 的 每个方法 组成数组。
                const methodNames = Object.getOwnPropertyNames(mod.prototype).filter(names => {
                    if (names !== 'constructor') {
                        return names
                    }
                })
                console.log('methodNames:', methodNames)
                console.log('-------')
                Object.defineProperty(this.controller, property, {
                    get() {
                        const merge: { [key: string]: any } = {}
                        methodNames.forEach(name => {
                            merge[name] = {
                                type: mod,
                                methodName: name
                            }
                        })
                        return merge
                    }
                })
            }
        })
    }
    loadRouter() {
        this.loadController() // 添加对应controller 方法到 controller对象上
        const mod = require(__dirname + '/router.js')
        console.log('controller:', this.controller)
        const routers = mod(this.controller)  // {method path  controller.user.user}
        console.log('routers:', routers)
        Object.keys(routers).forEach(key => {
            const [method, path] = key.split(' ');
            (<any>this.router)[method](path, async (ctx: BaseContext) => {
                const _class = routers[key].type  // routers[key] 获取controller.user.user  属性。 在 loadController已重写 type 就是构造函数
                const handler = routers[key].methodName;
                const instance = new _class(ctx)
                instance[handler]();
            })
        })
        return this.router.routes();
    }
}