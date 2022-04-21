export let _Vue;
export default function install(Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {

      }
    }
  })
}
