

function foo(){
     console.log('foo');
}

foo();

(function bar(){console.log('bar')}); //피연산자로 인식해 값으로 평가되어야하는 함수 리터럴로 해석된다.
// bar(); // not defined



var add1  = function addtest(){
     var a=10;
     return function(x,y){
          return x + y + a; 
     };
}();

console.log(add1(1,2)); // 13
var add2  = (function addtest(){
     var a=10;
     return Function('x','y',`return x + y + ${a}`);
}());

console.log(add2(1,2)); //a is not defined
