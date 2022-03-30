import * as fs from 'fs';
import { BaseContext } from 'koa';
import * as Koa from 'koa';
import * as Router from 'koa-router';
export class Loader {
    router: Router = new Router();
    controller: any = {};
    app: Koa;
    constructor(app: Koa) {
        this.app = app
    }
    loadConfig() {
        const configDef = __dirname + '/config/config.default.js';
        const configEnv = __dirname + (process.env.NODE_ENV === 'production' ? '/config/config.pro.js' : '/config/config.dev.js');
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge
            }
        })
    }
    loadService() {
        const service = fs.readdirSync(__dirname + '/service');

        Object.defineProperty(this.app.context, 'service', {
            get() {
                if (!(<any>this)['cache']) {
                    (<any>this)['cache'] = {};
                }
                const loaded = (<any>this)['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    service.forEach((d) => {
                        const name = d.split('.')[0];
                        const mod = require(__dirname + '/service/' + d);

                        loaded['service'][name] = new mod(this, this.app);
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    }
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
        this.loadService()
        this.loadConfig();
        const mod = require(__dirname + '/router.js')
        console.log('controller:', this.controller)
        const routers = mod(this.controller)  // {method path  controller.user.user}
        console.log('routers:', routers)
        Object.keys(routers).forEach(key => {
            const [method, path] = key.split(' ');
            (<any>this.router)[method](path, async (ctx: BaseContext) => {
                const _class = routers[key].type  // routers[key] 获取controller.user.user  属性。 在 loadController已重写 type 就是构造函数
                const handler = routers[key].methodName;
                const instance = new _class(ctx, this.app)
                instance[handler]();
            })
        })
        return this.router.routes();
    }
}