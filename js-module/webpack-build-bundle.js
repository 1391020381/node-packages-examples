(function (modules) {
    //缓存已经加载过的 module 的 exports，防止 module 在 exports 之前 JS 重复执行
    var installedModules = {};

    //类似 commonJS 的 require()，它是 webpack 加载函数，用来加载 webpack 定义的模块，返回 exports 导出的对象
    function __webpack_require__(moduleId) {
        //缓存中存在，则直接返回结果
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }

        //第一次加载时，初始化模块对象，并进行缓存
        var module = installedModules[moduleId] = {
            i: moduleId, // 模块 ID
            l: false, // 是否已加载标识
            exports: {} // 模块导出对象
        };

        /**
        * 执行模块
        * @param module.exports -- 模块导出对象引用，改变模块包裹函数内部的 this 指向
        * @param module -- 当前模块对象引用
        * @param module.exports -- 模块导出对象引用
        * @param __webpack_require__ -- 用于在模块中加载其他模块
        */
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        //标记是否已加载标识
        module.l = true;

        //返回模块导出对象引用
        return module.exports
    }

    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    //定义 exports 对象导出的属性
    __webpack_require__.d = function (exports, name, getter) {
        //如果 exports （不含原型链上）没有 [name] 属性，定义该属性的 getter
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
        }
    };
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            })
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        })
    };
    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key]
        }.bind(null, key));
        return ns
    };
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default']
            } : function getModuleExports() {
                return module
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter
    };
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    };
    // __webpack_public_path__
    __webpack_require__.p = "";

    //加载入口模块并返回入口模块的 exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js")
})({
    "./src/hello.js": (function (module, exports) {
        eval("module.exports = function(name) {\n    return 'hello ' + name\n}\n\n//# sourceURL=webpack:///./src/hello.js?")
    }),
    "./src/index.js": (function (module, exports, __webpack_require__) {
        eval("var sayHello = __webpack_require__(/*! ./hello */ \"./src/hello.js\")\nconsole.log(sayHello('lucas'))\n\n//# sourceURL=webpack:///./src/index.js?")
    })
});