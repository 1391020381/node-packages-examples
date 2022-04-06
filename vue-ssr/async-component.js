function asyncComponent({ componentFactory, loading = 'div', loadingData = 'loading', errorComponent, rootMargin = '0px', retry = 2 }) {
    let resolveComponent;
    return () => ({
        component: new Promise(resolve => resolveComponent = resolve),
        loading: {
            mounted() {
                const observer = new IntersectionObserver(([entries]) => {
                    if (!entries.isIntersecting) return;
                    observer.unobserve(this.$el);

                    let p = Promise.reject();
                    for (let i = 0; i < retry; i++) {
                        p = p.catch(componentFactory);
                    }
                    p.then(resolveComponent).catch(e => console.error(e));
                }, {
                    root: null,
                    rootMargin,
                    threshold: [0]
                });
                observer.observe(this.$el);
            },
            render(h) {
                return h(loading, loadingData);
            },
        },
        error: errorComponent,
        delay: 200
    });
}
export default {
    install: (Vue, option) => {
        Vue.prototype.$loadComponent = componentFactory => {
            return asyncComponent(Object.assign(option, {
                componentFactory
            }))
        }
    }
}