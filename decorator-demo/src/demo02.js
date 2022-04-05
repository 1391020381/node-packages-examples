function widthRouter(params) {
    console.log('widthRouter.params:', params)
    return function (target) {
        target.params = params
        console.log('widthRouter.target:', target)
    }
}
@widthRouter('Jameswain')
class App {

}
console.log(App)