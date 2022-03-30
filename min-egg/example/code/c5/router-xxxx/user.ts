const user = async (ctx: any, next: any) => {
    ctx.body = 'hello,ts-koa,user'
}
const userInfo = async (ctx: any, next: any) => {
    ctx.body = 'hello,userInfo'
}
export default {
    'get /': user,
    'get /userInfo': userInfo
}