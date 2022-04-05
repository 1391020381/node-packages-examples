var _dec, _dec2, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// src/demo03.js
// 装饰器的执行顺序
function log1(name) {
  // 接收参数层
  console.log('log1.name:', name);
  return function logDecorator(target) {
    // 装饰器层
    console.log('log.target: ', target);
  };
}

function connect(name) {
  // 接收参数层
  console.log('connect.name', name);
  return function connectDecorator(target) {
    // 装饰器层
    console.log('connect.target: ', target);
  };
}

function withRouter(target) {
  // 装饰器层
  console.log('withRouter.target: ', target);
} // 方法


function log2(target, name, descriptor) {
  console.log('log2:', target.constructor, name, descriptor);
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling 2${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

function log3(target, name, descriptor) {
  console.log('log3:', target.constructor, name, descriptor);
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling 3${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

let App = (_dec = log1('日志'), _dec2 = connect('连接器'), _dec(_class = withRouter(_class = _dec2(_class = (_class2 = class App {
  add(a, b) {
    return a + b;
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "add", [log2, log3], Object.getOwnPropertyDescriptor(_class2.prototype, "add"), _class2.prototype)), _class2)) || _class) || _class) || _class);
let app = new App();
app.add(1, 2);