
* server.entry.js
* client.entry.js

* 服务端打包好,html 再与 client.entry.js混合

* 集成路由
* vue-ssr 路由跳转规则

* 集成vuex


* [https://cloud.tencent.com/developer/article/1738923](SSR再好，也要有优雅降级策略哟~)

1. server.entry.js  client.entry.js 分别经 webpack打包成服务端用的 Server Bundle 和 客户端用的 Client Bundle。
2. 服务端 当Node Server 收到来自客户端的请求后,BundleRenderer会读取 Server Bundle,并且执行它,而Server Bundle 实现了数据预取并将填充数据的Vue实例挂载在HTML模版上, 接下来BundleRenderer将 HTML渲染为字符串,最后将完整的HTML返回给客户端。
3. 客户端:浏览器收到HTML后,客户端加载了Client Bundle，通过 app.$mount('#app') 的方式将Vue实例 挂载在服务端返回的静态 html上。

* 当服务端渲染失败或者触发降级操作时,客户端代码要重新执行组建的 async方法来预取数据
## 开启缓存
1. 页面级别
2. 组件级别