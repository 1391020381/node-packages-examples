// 极简的实现  链式调用  + 延迟机制 + 状态
class Promise {
    callbacks = [];
    state = 'pending';
    value = null;
    constructor() {
        fn(this._resolve.bind(this))
    }
    then(onFulfilled) {
        if (this.state === 'pending') {
            this.callbacks.push(onFulfilled)
        } else {
            onFulfilled(this.value)
        }
        return this;
    }
    _resolve(value) {
        this.state = 'fulfilled';
        this.value = value
        this.callbacks.forEach(fn => fn(value))
    }
}


// then 中 返回的是 this
// 可以多次调用then 因为是同一个实例
// 调用再多次then 也只能返回相同的一个结果。
// 需要在 then 返回一个新的 Promise 实例