const foo = require('./a')
function bar() {
    if (Math.random() > 0.5) {
        foo()
    }
}