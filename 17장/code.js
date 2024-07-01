// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
    console.log(this);
  }
  
  // 일반적인 함수로서 호출
  // 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
  foo(); // window
  
  // 메서드로서 호출
  const obj = { foo, a:1 }; // ES6 프로퍼티 축약 표현
  console.log(obj);
  obj.foo(); // obj
  
  // 생성자 함수로서 호출
  const inst = new foo(); // inst



  const strObj = new String('LEE');
  console.log(strObj); // String { 'LEE' }




const arrow = () =>{
    let radius=1;
  }
  new arrow(); //arrow is not a constructor
