"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
var fs = require("fs");
var Router = require("koa-router");
var route = new Router();
function loader() {
    var dirs = fs.readdirSync(__dirname + '/router');
    // [ 'user.js' ] router 目录下面的文件
    console.log('dirs:', dirs);
    dirs.forEach(function (filename) {
        var mod = require(__dirname + '/router/' + filename).default;
        // router每个文件导出的对象
        console.log('mod:', mod);
        Object.keys(mod).map(function (key) {
            var _a = key.split(' '), method = _a[0], path = _a[1];
            // 解析对应的方法 和路径
            console.log('method,path:', method, path);
            var handler = mod[key];
            route[method](path, handler);
        });
    });
    return route.routes();
}
exports.loader = loader;
