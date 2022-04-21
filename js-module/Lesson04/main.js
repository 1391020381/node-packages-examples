var ModuleManger = (function(){
    var modules = { };
    function define(name,deps,impl){
        for(let i=0;i<deps.length;i++){
            deps[i] = modules[deps[i]];
        }
        modules[name]=impl.apply(impl,deps);
    }

    function get(name){
        return modules[name]
    }

    var publicAPI = {
        define: define,
        get: get
    };

    return publicAPI;
})();

ModuleManger.define('foo',[],function(){
    function hello(){
        return 'hello';
    }
    return {
        hello: hello
    }    
});


ModuleManger.define('bar',['foo'],function(foo){
    function sayHi(){
        return foo.hello()+",山地人!";
    }
    return {
        sayHi: sayHi
    };
})

var bar = ModuleManger.get('bar');
console.log( bar.sayHi() );






