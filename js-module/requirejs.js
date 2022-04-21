
// requirejs 使用
// 模块信息配置
// require.config({
//     paths: {
//         jquery: 'https://code.jquery.com/jquery-3.4.1.js'
//     }
// })
// // 依赖模块加载与调用
// require(['jquery'], function () {
//     $('#app').html('loaded')
// })
// // 模块定义
// if (typeof define === 'function' && define.amd) {
//     define('jquery', [], function () {
//         return juery
//     })
// }
// 配置信息
const cfg = { paths: {} }
let reqCounter = 0
const registry = {}  // 已经注册的模块,  getModule(name)  -> registry -> new Module(name) 
const defMap = {}  // 缓存加载的模块 单个模块也就是 define定义的模块

// 1. require
// 2. define
// 3. getModule -> registry -> new Module(name)
// 4. Module  name depCount  depsMaps depExports  definedFn  init  enable  check

// 全局 require 方法
// 扩展配置
req.config = config => {
    Object.assign(cfg, config)
}
req = require = (deps, callback) => {
    if (!deps && !callback) {
        return
    }
    if (!deps) {
        deps = []
    }
    if (typeof deps === 'function') {
        callback = deps
        deps = []
    }
    const mod = getModule()
    mod.int(deps, callback)
}
// 模块加载器的工厂方法
const getModule = name => {
    if (!name) {
        // 如果模块名不存在 表示为匿名模块,自动构造模块名
        name = `@mod_${++reqCounter}`
    }
    let mod = registry[name]
    if (!mod) {
        mod = registry[name] = new Module(name)
    }
    return mod;
}
// require() ->  getModule() -> mod.init(deps,callback)
// 模块加载器
// 每个module registry[name] 上
// 每个模块 name  depCount depsMaps  depExports
// enable -> deps-> forEach -> getModule(name)/loadModule(url)
// loadModle(url) -> onScriptLoad -> defined ->  getModule-> mod.init(def.deps,callback)
class Module {
    constructor(name) {
        this.name = name;
        this.depCount = 0;
        this.depsMaps = []
        this.depExports = [];
        this.definedFn = () => { }
    }
    init(deps, callback) {
        this.deps = deps;
        this.callback = callback
        // 判断是否存在依赖
        if (deps.length === 0) {
            this.check()
        } else {
            this.enable()
        }
    }
    // 启用模块  进行依赖加载
    enable() {
        this.deps.forEach((name, i) => {
            // 记录已加载的模块数
            this.depCount++
            // 实例化依赖模块的模块加载器,绑定模块加载完毕的调
            const mod = getModule(name)
            mod.definedFn = exports => {

                // 当依赖模块的回调被执行时,当前模块的依赖数减少 保存回调函数。 触发当前模块的check

                this.depCount--
                this.depExports[i] = exports;
                this.check()
            }
            // 在配置中获取依赖模块的路径,进行模块加载
            const url = cfg.paths[name]
            loadModule(name, url)
        });
    }
    // 检查依赖是否加载完毕
    check() {
        let exports = this.exports;
        if (this.depCount < 1) {
            exports = this.callback.apply(null, this.depExports)
            this.exports = exports
            // 激活 defined 回调
            this.definedFn(exports)
        }
    }
}

// 依赖的加载
const loadModule = (name, url) => {
    const head = document.getElementsByName('head')[0];
    const node = document.createElement('script')
    node.type = 'text/javascript'
    node.async = true
    // 设置一个 data 属性 便于依赖加载完毕后拿到模块名
    node.setAttribute('data-module', name)
    node.addEventListener('load', onScriptLoad, false)
    node.src = url;
    head.appendChild(node)
    return node
}

// 节点绑定的 onload事件函数
// 通过 data-module 获取 mod  def
// 加载 mod 对应的依赖
const onScriptLoad = evt => {
    const node = evt.currentTarget;
    node.removeEventListener('load', onScriptLoad, false)
    // 获取模块名
    const name = node.getAttribute('data-module');
    const mod = getModule(name)
    // 加载其他单独模块 也就是 define 定义的模块
    const def = defMap[name]
    mod.init(def.deps, def.callback)
}

define = (name, deps, callback) => {
    defMap[name] = { name, deps, callback }
}

