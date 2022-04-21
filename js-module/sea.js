const seajs = {}
const cache = seajs.cache = {}

define = (id, factory) => {
    const uri = id2uri(id)
    const deps = parseDependencies(factory.toString())
    const mod = cache[uri] || (cache[uri] = new Module(uri))
    mod.deps = deps;
    mod.factory = factory
}
class Module {
    constructor(uri, deps) {
        this.status = 0
        this.uri = uri
        this.deps = deps
    }
}
seajs.use = (ids, callback) => {
    const deps = isArray(ids) ? ids : [ids]
    deps.forEach(async (dep, i) => {
        const mod = cache[dep]
        mod.load()
    })
}