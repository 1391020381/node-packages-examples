1. require.config 拓展配置
2. require  加载模块
3. define 定义模块

* cfg = { paths:{}}
* defMap = {} 缓存加载模块
* registry[name] 保存每个模块实例

4. 每个模块都是一个 Module实例
5. Module
    - name 
    - depCount
    - depsMaps
    - depExports 
    - definedFn
    - init(deps,callback)  
    - enable 通过loadModule(name,url)创建 script来动态加载 该模块
    - onScriptLoad 模块加载完毕 通过 registry[name] 来获取 模块实例  并通过 mod.init（def.deps,def.callback）



    * 假设一个网页 require(['jquery'],function(){})
    * define('jquery',[],funtion(){})


    * 首先页面会加载 requirejs,执行 requirejs代码
    * 然后会主入口  require(['jquery'],function(){})
    * 执行require函数, 会创建一个 Module实例 mod.init(['jquery'],callback)
    * 当依赖不为空，就执行 mod.enable()
    * enable 其实就是拿到依赖，循环异步加载
    * 加载完成 如果是 define 定义的模块 其实就是执行 define函数 也就是 保存 模块 并返回 内部实例