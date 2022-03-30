import { Controller } from "./base";

export default class User extends Controller {
    async user() {
        // this.ctx.body = 'hello user,class'
        // @ts-ignore: Unreachable code error
        this.ctx.body = this.ctx.service.check.index();
    }
    async userInfo() {
        this.ctx.body = 'hello userInfo class'
    }
}