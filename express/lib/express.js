const App = require('./application')
console.log('App:', App)
function createApplication() {
    const app = new App()
    return app
}

module.exports = createApplication