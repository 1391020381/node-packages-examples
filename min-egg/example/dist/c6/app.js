"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var loader_1 = require("./loader");
var app = new Koa();
var loader = new loader_1.Loader(app);
app.use(loader.loadRouter());
app.listen(3000, '127.0.0.1', function () {
    console.log('服务器在运行');
});
