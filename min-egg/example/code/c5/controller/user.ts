import { Controller } from "./base";

export default class User extends Controller {
    async user() {
        this.ctx.body = 'hello user,class'
    }
    async userInfo() {
        this.ctx.body = 'hello userInfo class'
    }
}