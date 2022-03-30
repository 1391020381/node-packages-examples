"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var fs = require("fs");
var Router = require("koa-router");
var Loader = /** @class */ (function () {
    function Loader(app) {
        this.router = new Router();
        this.controller = {};
        this.app = app;
    }
    Loader.prototype.loadService = function () {
        var service = fs.readdirSync(__dirname + '/service');
        Object.defineProperty(this.app.context, 'service', {
            get: function () {
                var _this = this;
                if (!this['cache']) {
                    this['cache'] = {};
                }
                var loaded = this['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    service.forEach(function (d) {
                        var name = d.split('.')[0];
                        var mod = require(__dirname + '/service/' + d);
                        loaded['service'][name] = new mod(_this);
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    };
    Loader.prototype.loadController = function () {
        var _this = this;
        var dirs = fs.readdirSync(__dirname + '/controller');
        console.log('dirs:', dirs);
        dirs.forEach(function (filename) {
            var property = filename.split('.')[0]; // user
            var mod = require(__dirname + '/controller/' + filename).default;
            console.log(__dirname + '/controller/' + filename, 'xxxxx');
            console.log('mod:', mod);
            if (mod) {
                // methodNames 对应 controller 的 每个方法 组成数组。
                var methodNames_1 = Object.getOwnPropertyNames(mod.prototype).filter(function (names) {
                    if (names !== 'constructor') {
                        return names;
                    }
                });
                console.log('methodNames:', methodNames_1);
                console.log('-------');
                Object.defineProperty(_this.controller, property, {
                    get: function () {
                        var merge = {};
                        methodNames_1.forEach(function (name) {
                            merge[name] = {
                                type: mod,
                                methodName: name
                            };
                        });
                        return merge;
                    }
                });
            }
        });
    };
    Loader.prototype.loadRouter = function () {
        var _this = this;
        this.loadController(); // 添加对应controller 方法到 controller对象上
        this.loadService();
        var mod = require(__dirname + '/router.js');
        console.log('controller:', this.controller);
        var routers = mod(this.controller); // {method path  controller.user.user}
        console.log('routers:', routers);
        Object.keys(routers).forEach(function (key) {
            var _a = key.split(' '), method = _a[0], path = _a[1];
            _this.router[method](path, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var _class, handler, instance;
                return __generator(this, function (_a) {
                    _class = routers[key].type // routers[key] 获取controller.user.user  属性。 在 loadController已重写 type 就是构造函数
                    ;
                    handler = routers[key].methodName;
                    instance = new _class(ctx);
                    instance[handler]();
                    return [2 /*return*/];
                });
            }); });
        });
        return this.router.routes();
    };
    return Loader;
}());
exports.Loader = Loader;
