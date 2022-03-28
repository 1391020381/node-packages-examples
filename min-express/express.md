# Express官网教程
1. Health Checks and Graceful Shutdown
   * https://github.com/godaddy/terminus
2. Process managers fro Express apps
* process manager的作用
    - 当应用 crashes 时 自动重启
    - 监控运行时 性能和资源消耗
    - 动态修改配置提高性能
    - 控制进程




 # PM2重启策略
 * 使用PM2启动应用程序时,应用程序会在自动退出, 事件循环为空 应用程序崩溃时自动重启。   
 ## 优雅的关闭
 * 为了允许正常重启 重新加载 关闭进程。 请确保在让应用程序退出之前拦截 SIGINT信号并清除所需的所有内容(例如 数据库连接  处理业务)
 ```
   process.on('SIGINT',function(){
       db.stop(function(err){
           process.exit(err?1:0)
       })
   })
 ```
 * 现在 pm2 reload 会变成一个优雅的Reload

 ## 优雅的开始
 ```
  var http = require('http')
  var app = http.createServer(function(req,res){
      res.writeHead(200)
      res.end('hey')
  })
  var listener = app.listen(0,function(){
      console.log('Listening on port ' + listener.address().port)
      process.send('ready')
  })
  pm2 start app.js  --wait-ready
 ```
 ## 在 docker中使用 pm2
 1. 在 Dockerfile 中添加 安装 PM2
 * RUN npm install pm2 -g 
 * CMD ["node","app.js"]  ->  CMD ['pm2-runtime',"app.js"]
 2. 启动配置文件
 * ecosystem.config.js
 * CMD ['pm2-runtime','ecosystem.config.js']


 # Production best practices: performance and reliability
 1. Things to do in your code(the dev part)
    * Use gzip compression
    * Dont't use synchronous functions
    * Do logging correctly
    * Handle exceptions properly
 2.  Things to do in your environment / setup (the ops part)
    * Set NODE_ENV to “production”
    * Ensure your app automatically restarts
    * Run your app in a cluster
    * Cache request results
    * Use a load balancer
    * Use a reverse proxy


# Production Best Practices: Security   

