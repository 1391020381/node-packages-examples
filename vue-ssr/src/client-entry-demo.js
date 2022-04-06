import 'es6-promise/auto'
import { createApp } from './app'
const { app, router, store } = createApp()
// 由于服务端渲染时，context.state 作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。在客户端，在挂载到应用程序之前，state为window.__INITIAL_STATE__。
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                next()
            })
            .catch(next)
    })
    // 挂载在DOM上
    app.$mount('#app')
})

