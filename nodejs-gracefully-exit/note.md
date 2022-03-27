# 优雅退出
1. 即让nodejs进程处理完存量请求后再退出。

* 关键在于nodejs提供了 server.close()
* Stops the server from accepting new connections and keeps existing connections. This function is asynchronous, the server is finally closed when all connections are ended and the server emits a 'close' event. The optional callback will be called once the 'close' event occurs. Unlike that event, it will be called with an Error as its only argument if the server was not open when it was closed.
* 停止服务器接受新连接并保持现有连接。 这个函数是异步的，当所有连接结束并且服务器发出一个'close'事件时，服务器最终关闭。 一旦“关闭”事件发生，将调用可选回调。 与该事件不同，如果服务器在关闭时未打开，它将以错误作为唯一参数调用。

* 停止接受新连接
* 保持现有连接
* 所有连接结束，并服务器发出 close 事件
* 服务器关闭, 一旦关闭 将调用可选回调。



* 监听server的 close事件， 等触发 close事件,再退出进程。

* [让 Node.js Server 优雅退出]http://claude-ray.com/2019/05/23/node-graceful-server/
1. pm2 
```
 process.on('SIGINT',function(){
     db.stop(function(err){
         process.exit(err?1:0)
     })
 })

```


```
process.on('uncaughtException', async err => {
  logger.fatal(`Uncaught exception:`, err)
  server.keepAliveTimeout = 1
  server.close(e => {
    if (e) {
      logger.error('Error while server is closing', e)
    }
    logger.info('Server is closed')
    process.exit(1)
  })

  setTimeout(() => {
    logger.warn('Server close timeout! Process exit 1')
    process.exit(1)
  }, 10000)
})

```