

function foo(){
     console.log('foo');
}

foo();

(function bar(){console.log('bar')}); //피연산자로 인식해 값으로 평가되어야하는 함수 리터럴로 해석된다.
// bar(); // not defined

