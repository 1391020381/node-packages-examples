
class Promise {
    callbacks = [];
    state = 'pending';
    value = null;
    constructor(fn) {
        fn(this._resolve.bind(this))
    }
    then(onFulfilled) {
        return new Promise(resole => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            })
        })
    }
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback)
        }
        if (!callback.onFulfilled) {
            callback.resolve(this.value)
            return;
        }
        // 前一个 promsie的回调
        // 如果 onFulfiled 返回的是一个 promise
        // 由使用 Promise的开发者决定后续Promise的状态
        var ret = callback.onFulfilled(this.value)
        callback.resolve(ret)
    }
    _resolve(value) {
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            var then = value.then
            if (typeof then === 'function') {
                then.call(value, this._resolve.bind(this))
                return
            }
        }
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(callback => this._handle(callback))
    }
}