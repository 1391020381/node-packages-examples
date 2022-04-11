// a.js
import { bar } from './b.mjs';
export function foo() {
    bar();
    console.log('a.j执行完毕');
}
foo();