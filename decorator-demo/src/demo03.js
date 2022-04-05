// src/demo03.js
// 装饰器的执行顺序
function log1(name) { // 接收参数层
    console.log('log1.name:', name)
    return function logDecorator(target) { // 装饰器层
        console.log('log.target: ', target);
    }
}

function connect(name) { // 接收参数层
    console.log('connect.name', name);
    return function connectDecorator(target) { // 装饰器层
        console.log('connect.target: ', target);
    }
}

function withRouter(target) { // 装饰器层
    console.log('withRouter.target: ', target);
}
// 方法
function log2(target, name, descriptor) {
    console.log('log2:', target.constructor, name, descriptor)
    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling 2${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}
function log3(target, name, descriptor) {
    console.log('log3:', target.constructor, name, descriptor)
    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling 3${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}
@log1('日志')
@withRouter
@connect('连接器')
class App {
    @log2
    @log3
    add(a, b) {
        return a + b;
    }
}

let app = new App();
app.add(1, 2)