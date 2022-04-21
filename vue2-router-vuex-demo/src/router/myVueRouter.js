let Vue = null;
class VueRouter {

}

VueRouter.install = function (vue) {
  Vue = vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this._root = this;
        this._router = this.$options.router;
      } else {
        this._root = this.$parent && this.$parent._root
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
    }
  })
  Vue.component('router-link', {
    render(h) {
      return h('a', {}, '首页')
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h('h1', {}, '首页视图')
    }
  })
}

// $router 是VueRouter的实例对象
// $route 是当前的路由对象 $route 是 $router的一个属性
// new Vue({router})  目前只有根组件有这个 router值,而其他组件没有
export default VueRouter
