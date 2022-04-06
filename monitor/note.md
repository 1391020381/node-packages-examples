* https://juejin.cn/post/6844904080628776967#heading-0
* window.onerror 同步任务和异步任务都可以捕获。
* 返回 true 就不会被上抛了。
* onerror 无法捕获网络错误 比如图片地址
* window.addEventListener('error',()=>{})
* Promise 异常
* window.addEventListener('unhandledrejection',e=>{
    console.log(e)
    // throw e.reason
})
* async/await异常捕获 try catch


```
window.addEventListener('unhandledrejection',e=>{
    throw e.reason
})

window.addEventListener('error',args=>{
    console.log('error event:',args)
    retrun true
},true)

```