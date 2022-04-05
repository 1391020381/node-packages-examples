class Person {
    children = []
    @nonenumerable
    get kidCount() {
        return this.children.length
    }
}

function nonenumerable(target, name, descriptor) {
    descriptor.enumerable = false;
    return descriptor;
}

let person = new Person()
console.log('person:', person)
console.log(person.kidCount)