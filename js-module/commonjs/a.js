const bar = require('./b');
module.exports = function foo() {
    bar()
    console.log('执行完毕')
}
foo()