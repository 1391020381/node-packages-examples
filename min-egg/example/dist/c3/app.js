"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var loader_1 = require("./loader");
var app = new Koa();
app.use(loader_1.loader());
app.listen(3000, '127.0.0.1', function () {
    console.log('服务器在运行');
});
