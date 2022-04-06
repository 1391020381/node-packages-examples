
import createApp from './main'

const { app, router, store } = createApp()
// 由于服务端渲染时，context.state 作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。在客户端，在挂载到应用程序之前，state为window.__INITIAL_STATE__。
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
} else {
    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        console.log('matchedComponents:', matchedComponents)
        Promise.all(matchedComponents.map(component => {
            return component.asyncData && component.asyncData({ store })
        })).then(() => {
            app.$mount('#app')
        }).catch(err => {
            console.log('router.onReady-client:', err)
            app.$mount('#app')
        })
    })
}