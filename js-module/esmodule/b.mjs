// b.js
import { foo } from './a.mjs';
export function bar() {
    if (Math.random() > 0.5) {
        console.log('b.j执行完毕');
        foo();
    }
}