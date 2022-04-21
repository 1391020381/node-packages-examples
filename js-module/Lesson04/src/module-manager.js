var ModuleManger = (function(){
    var modules = { };
    function define(name,deps,impl){
        for(let i=0;i<deps.length;i++){
            deps[i] = modules[deps[i]];
        }
        modules[name]=impl.apply(impl,deps);
    }

    function require(name){
        return modules[name]
    }

    window.define = define;
    window.require = require;
})();
