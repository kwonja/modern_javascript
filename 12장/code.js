

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

function add (x,y){
     console.log(arguments); //[Arguments] { '0': 1, '1': 2, '2': 3 }
     return x+y;
}

add(1,2,3);

console.log( undefined || 0);

function outer() {
     var x = 1;
     inner(); //호스팅이 일어나서 위에서 실행해도 된다.
     // 중첩 함수
     function inner() {
       var y = 2;
       // 외부 함수의 변수를 참조할 수 있다.
       console.log(x + y); // 3
     }
   
     
   }
   
   outer();
   