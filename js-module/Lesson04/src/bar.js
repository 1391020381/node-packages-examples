define('bar',['foo'],function(foo){
    function sayHi(){
        return foo.hello()+",山地人!";
    }
    return {
        sayHi: sayHi
    };
});
