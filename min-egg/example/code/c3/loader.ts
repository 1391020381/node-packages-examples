import * as fs from 'fs';
import * as Router from 'koa-router';

const route = new Router()

export function loader() {
    const dirs = fs.readdirSync(__dirname + '/router')
    // [ 'user.js' ] router 目录下面的文件
    console.log('dirs:', dirs)
    dirs.forEach(filename => {
        const mod = require(__dirname + '/router/' + filename).default
        // router每个文件导出的对象
        console.log('mod:', mod)
        Object.keys(mod).map(key => {
            const [method, path] = key.split(' ');
            // 解析对应的方法 和路径
            console.log('method,path:', method, path)
            const handler = mod[key];
            (<any>route)[method](path, handler);
        })
    })
    return route.routes()
}