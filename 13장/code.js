function foo() {
    console.log('global function foo');
  }
  
  function bar() {
    // 중첩 함수
    function foo() {
      console.log('local function foo');
    }
  
    foo(); // local functuion foo 가 bar에서 먼저 찾아진다.
  }
  
  bar();

let i = 10;

for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 10

var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1


function a() {
    var x = 10;
    function b() {
        console.log(x);
    }
    b();
  }
  
function b() {
    console.log(x);
}
a(); //10
b(); //1