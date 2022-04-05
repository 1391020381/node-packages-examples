var _dec, _class;

function widthRouter(params) {
  console.log('widthRouter.params:', params);
  return function (target) {
    target.params = params;
    console.log('widthRouter.target:', target);
  };
}

let App = (_dec = widthRouter('Jameswain'), _dec(_class = class App {}) || _class);
console.log(App);