// 我们也可以通过给gen.next()传值的方式，让 yield 能返回 resolve 的值



function run(gen) {
    //把返回值包装成promise
    returnnewPromise((resolve, reject) => {
        var g = gen()

        function step(val) {
            //错误处理
            try {
                var res = g.next(val)
            } catch (err) {
                return reject(err);
            }
            if (res.done) {
                return resolve(res.value);
            }
            //res.value包装为promise，以兼容yield后面跟基本类型的情况
            Promise.resolve(res.value).then(
                val => {
                    step(val);
                },
                err => {
                    //抛出错误
                    g.throw(err)
                });
        }
        step();
    });
}


// 生成器函数根据yield语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next来分别执行各个case
function gen$(_context) {
    while (1) {
        switch (_context.prev = _context.next) {
            case 0:
                _context.next = 2;
                return 'result1';

            case 2:
                _context.next = 4;
                return 'result2';

            case 4:
                _context.next = 6;
                return 'result3';

            case 6:
            case "end":
                return _context.stop();
        }
    }
}
// 低配版context
var context = {
    next: 0,
    prev: 0,
    done: false,
    stop: function stop() {
        this.done = true
    }
}
// 低配版invoke
let gen = function () {
    return {
        next: function () {
            value = context.done ? undefined : gen$(context)
            done = context.done
            return {
                value,
                done
            }
        }
    }
}



console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')


// script start
// async2 end
// Promise
// script end
// promise1
// promise2
// setTimeout
// async1 end



async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')

// script start
// bar start
// foo
// promise executor
// script end
// promise then
// bar end
// setTimeout