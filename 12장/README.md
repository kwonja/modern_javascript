# [12장]함수

---

## 함수란?

입력을 받아 출력을 내보내는 과정을 정의한것이다.

재료를 투입해 어떤 결과를 만들어내는 역활을 하는 기계와 같다고 생각해볼 수 있다.

```jsx
function add(x,y){  // add -> 함수 이름 x,y는 파라미터,매개변수라고 부름
	return x + y; //반환값
}
//1,2,3을 함수라고 부르고
//함수 이름과 인수를 넣어 호출이 가능하다
add(2,5); //2,5는 인수 or 인자
```

함수는 정의를 통해 생성한다.

```jsx
function add(x,y){
	return x+y;
}
```

정의된 함수는 호출을 해야 사용이 가능하다

```jsx
var result = add(2,5);
//7
```

## 함수를 사용하는 이유

함수는 반복적인 작업을 하나의 과정으로 묶어 사용하기만 하면 되므로 코드의 재사용이라는 측면에서 매우 유용하다.

- 함수의 장점
    - 중복되는 코드속에서 실수를 방지할수 있다 → 코드 신뢰성 증가
    - 중복되는 코드를 줄여 수정에 걸리는 시간을 줄인다 → 유지보수 편의성 증가

## 함수 리터럴

자바스크립트의 함수는 객체 타입의 값이다.

객체는 리터럴값으로 표현이 가능하다

즉, **함수도 리터럴로 표현**할 수 있다.

함수 리터럴은 function 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성된다.

### 함수 리터럴 구성 요소

- 함수이름
    - 함수 이름은 식별자다. 따라서 식별자 네이밍 규칙을 준수해야 한다.
    - 함수 이름은 함수 몸체내에서만 참조할 수 있는 식별자다.
    - 함수 이름은 생략할 수 있다.
        - 이름이 있는 함수 → 기명 함수(named function)
        - 이름이 없는 함수 → 무명/익명함수(anonymous function)
- 매개변수 목록
    - 0개이상의 매개변수를 소괄호로 감싸고 쉼표로 구분한다
    - 각 매개변수에는 함수를 호출할때 지정한 인수가 순서대로 할당된다. 즉, 매개변수 목록은 순서에 의미가 있다.
    - 매개변수는 함수 몸체내에서 변수와 동일하게 취급된다. 따라서 변수와 마찬가지로 식별자 네이밍 규칙을 준수해야한다.
- 함수 몸체
    - 함수가 호출 되었을때 일괄적으로 실행될 문들을 하나의 실행단위로 정의한 코드 블록이다.
    - 함수몸체는 함수 호출에 의해 실행된다.

리터럴은 약속된 기호를 사용해 값을 생성하는 표기 방식이다

함수 리터럴도 평가되어 값을 생성하며, 객체타입의 값을 생성한다고 할수 있다.

따라서 함수는 객체이다.

함수는 객체라고 할 수 있지만 일반 객체와는 다르다.

일반 객체는 호출할 수 없지만, 함수는 호출이 가능하다.

또한 일반객체에는 없는 함수 객체만의 고유한 프로퍼티를 갖는다.

## 함수 정의

함수를 호출하기 이전에 매개변수, 실행할 문장, 그리고 반환값을 지정하는것을 말한다

자바스크립트 엔진은 함수 리터럴에 맞게 평가하고 평가가 끝나면 함수객체가 된다.

### 함수를 정의하는 방법

1. 함수 선언문

```jsx
function add(x,y){
	return x+y;
}
```

1. 함수 표현식

```jsx
var add = function(x,y){
		return x+y
}
```

1. Function 생성자 함수

```jsx
var add = new Funtion('x','y','return x+y');
```

1. 화살표 함수(ES6)

```jsx
var add = (x,y)=> x+y;
```

### 변수 선언과 함수 정의

c언어에서 “정의”는 실제 메모리에 올라가는가를 정의라고 하는데, 자바스크립트는 선언과 동시에 암묵적으로 메모리에 올라가기때문에 정의가 모호하다

ECMA에서 변수는 선언 , 함수는 정의로 용어를 정해서 변수는 선언 함수는 정의로 용어를 구분하고간다

### 함수 선언문

```jsx
function add(x,y){
	return x + y
}
```

함수 선언문은 함수 리터럴과 형태가 동일하다. 하지만 함수 리터럴은 함수 이름을 생략할수 있으나 함수 선언문은 이름을 생략할 수 없다.

```jsx
funcion (x,y){
	return x+y
}
//function name 에러 발생
```

함수 선언문은 표현식이 아닌 문이다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a858fa0d-64c8-4449-950c-9b47a942d816/7ba02301-05d6-476d-9a02-2f07aaac3ef9/Untitled.png)

브라우저에 함수 선언문을 입력하면 undefined가 출력된다.

표현식인 문이라면 완료값 undefined 대신 표현식이 평가되어 생성된 함수가 출력되어야한다

```jsx
var add = function add(x,y){
	return x + y;
}

//console.log(add(2,5)) //7
```

위 문장을 보면 함수 선언문이 객체를 리턴해서 호출이 가능해진다 왜 그럴까?

**자바스크립트는 문장을 해석**한다

{}의 경우 코드 블럭인지 객체 리터럴인지를 판단한다.

**대입연산자가 있는 경우 오른쪽이 함수 리터럴이 되도록, 없으면 함수 선언문이 되도록 해석해준다.**

```jsx
function foo(){
     console.log('foo');
}

foo(); //foo

(function bar(){console.log('bar')}); //피연산자로 인식해 값으로 평가되어야하는 함수 리터럴로 해석된다.
bar(); // not defined
```

함수 선언문으로 생성된 foo는 호출할 수 있으나, 함수 리터럴 표현식으로 생성된 bar는 호출할 수 없다.

![alt text](image.png)

메모리를 간단하게 그려보면 위와 같이 **함수 리터럴로 함수를 정의할 경우** 메모리에 식별자가 존재하지 않아 호출할 수 없다.

![alt text](image-1.png)

함수 선언문으로 정의한 foo 함수의 경우는 함수를 호출할 수 있었다.

이유는 함수 이름이 식별자로 메모리내에 저장되어 있기때문이다.

이를 통해 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함**수 이름과 동일한 이름의 식별자를 암묵적으로 생성**하고 거기에 함수 객체 주소를 할당한다.

위 메모리를 코드로 반환해보면 아래와 같은 형태를 띈다.

```jsx
var add(식별자) = function add(함수이름)(x,y){
	 return x+y;
}

console.log(add(식별자)(2,5))
```

**함수는 함수이름으로 호출하는것이 아니라 함수 객체를 가리키는 식별자로 호출된다**

## 함수 표현식

```jsx
//함수 표현식
var add = function(x,y){
	return x+y;
}

console.log(add(x,y));
```

값의 성질을 갖는 객체를 일급 객체라고 한다

자바스크립트의 함수는 일급 객체이다.

이말은 함수를 값처럼 자유롭게 사용할수 있다는 것이다.

함수는 일급객체이므로 함수 리터럴로 생성한 함수 객체를 변수에 할당할 수 있다.

위처럼 익명함수는 특정 메모리에 존재하게되고, add식별자가 익명함수주소를 참조하게된다.

```jsx

var add = function foo(x,y){
	return x + y;
}
//함수 객체를 가리키는 식별자로 호출
console.log(add(2,5));

//함수 이름으로 호출하면 ReferenceError가 발생
//함수 이름은 함수 몸체 내부에서만 유효한 식별자다
console.log(foo(2,5));
```

- 함수 선언문
    - 표현식이 아닌 문
- 함수 표현식
    - 표현식인 문 → 좌항,우항과 같이 평가되어지는 문장

<aside>
💡 함수를 호출하기위해서는 함수 선언문은 함수를 정의하기만 하면 함수이름이 식별자이름으로 암묵적으로 메모리에 저장되지만
함수 표현식은 함수이름으로 된 객체만 생성될뿐 호출을 해주기 위해서는 식별자를 선언해줘야한다.

</aside>

### 함수 생성 시점과 함수 호이스팅

```jsx
console.dir(add); //f add(x,y);
console.dir(sub); //undefined

console.log(add(2,5);
console.log(sub(2,5)); //sub is not a function

function add(x,y){
	return x + y;
}

var sub = function(x,y){
	return x-y;
}
```

![alt text](image-2.png)

- 함수 선언문
    - 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다.
    - 런타임 이전에 엔진에 의해 함수 객체를 선언하고 암묵적으로 식별자를 생성하고 생성된 함수 객체를 할당한다
- 함수 표현식
    - var 변수로 선언된 키워드는 식별자로 이미 선언되어 undefined 값을 가진다
    - 변수 할당문의 값은 할당문이 실행되는 시점에 평가되어 함수 객체가 된다.

함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는것이 아니라 변수 호이스팅이 발생한다.

함수 호이스팅은 함수가 선언되고나서 호출된다는 개념을 무시하기때문에 함수 표현식을 사용하는것을 권장한다.



## Function 함수

생성자 함수는 객체를 생성하는 함수를 말한다.

- 생성자 함수 객체 생성 방식

```jsx
var add = new Function('x','y','return x + y');
console.log(add(2,5)); //7
```

<aside>
💡 **즉시 실행 함수**

</aside>

아래와 같이 함수 선언문에 **즉시 실행**을 하려고 하면 에러가 난다

```jsx
function aa(){
     var a=10;
     console.log('add1');
     return function(x,y){
          return x + y + a; 
     };
}(); //Expression expected 에러가 발생한다
```

함수 선언과 동시에 실행을 하려면 함수 표현식으로 해석하도록 해야한다.

- 첫번째 방법
    - 바깥에 () 삽입

```jsx
(function aa(){
     var a=10;
     console.log('add1');
     return function(x,y){
          return x + y + a; 
     };
}());

//add1
```

- 두번째 방법
    - ()을 함수 선언문에 넣고 실행

```jsx
function (aa(){
     var a=10;
     console.log('add1');
     return function(x,y){
          return x + y + a; 
     };
})();

//add1
```

두가지 모두 똑같이 동작한다

즉시 실행할수 있는 함수 표현식이라는 것을 알려주면 즉시실행을 할 수 있다.

```jsx
var aa = function(){
     var a=10;
     console.log('add1');
     return function(x,y){
          return x + y + a; 
     };
}();
```

위와 같이 함수 표현식 방법으로 사용후 실행하는 방법도 존재한다.

```jsx
var aa = (function(){
     var a=10;
     console.log('add1');
     return function(x,y){
          return x + y + a; 
     };
}());
```

즉시 실행 함수라는 것을 알려주기위해서 위와 같은 방법을 선호한다고 한다.

### 결론

함수를 즉시 실행하고 싶으면 함수 표현식으로 바꿔줘야 한다

함수 표현식으로 바꾸는 방법은 대입연산자(=)에 오른쪽에 위치해 있거나 ()을 통해 함수를 감싸주면 된다.

### Function 함수를 사용하면 안되는 이유

```jsx
var add1  = function addtest(){
     var a=10;
     return function(x,y){
          return x + y + a; 
     };
}();

console.log(add1(1,2)); // 13
var add2  = (function addtest(){
     var a=10;
     return Function('x','y','return x + y + a');
}());

console.log(add2(1,2)); //a is not defined
```

문자열로 인식해 클로저와 같은 기능을 사용하지 못한다.

```jsx
var add2  = (function addtest(){
     var a=10;
     return Function('x','y',`return x + y + ${a}`);
}());
```

ES6문법인 표현식 삽입 문법으로  a를 변수로 인식해주면  13이 잘 출력되긴 하지만 권장하지 않는 방법이라고 생각한다.

### 화살표 함수

ES6에 도입된 함수,  function 키워드 대신에 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다.

화살표 함수는 **항상 익명 함수**로 정의한다

```jsx
const add = (x,y) => x+y;
console.log(add(2,5));
```

화살표 함수는 함수선언문이나 함수 표현식을 대체하기 위해서 디자인 된것은 아니다.

표현만 간략한 것이 아니라 내부 동작 또한 간략화되어 있다.

- 다른점
    - 생성자 함수로 사용할 수 없다
    - this,prototype,arguments에 대해서 다르다
    - 자세한 건 26.3절에서 자세히 살펴본다


## 함수 호출

인수는 함수를 호출할때 지정하며 개수와 타입에 제한이 없다.

```jsx
//함수 선언문
function add(x,y){
  //함수 몸체
	return x + y;
}

//함수 호출
//인수 1과 2가 매개변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
```

x,y는 undefined로 초기화 된 후 인수가 할당되기때문에 인수가 부족하면

2 + undefined 연산을 하게되어 NaN이 출력된다

```jsx
function add(x,y){
	return x + y;
}

console.log(add(2)) //NaN
```

- 초과된 인수는 무시된다

```jsx
function add(x,y){
	return x + y;
}

console.log(add(2,3,4)) //5
```

사실 초과된 인수는 없어지는게 아니다

```jsx
function add (x,y){
     console.log(arguments); //[Arguments] { '0': 1, '1': 2, '2': 3 }
     return x+y;
}

add(1,2,3);
```

arguments 객체는 함수를 정의할때 개수를 확정할수 없는 가변 인자 함수를 구할때 유용하게 사용된다.

## 인수 확인

```jsx
function add(x,y){
	return x + y;
}

console.log(add(2,3)) //5
console.log(add('a','b')) // 'ab'
```

- x,y에 대해서 typeof x === number 같은 문장으로 조건을 줌
    - 틀릴시 throw new TypeError를 던지는 방법
- arguments객체를 통해 인수개수를 확인할수도 있고
- 단축평가를 통해 매개변수에 기본값을 할당해주는 방법도 있다.

동적타입 언어이기때문에 런타임에 타입이 결정된다 이를 막기 위해는 타입스크립트를 사용하는방법도 있다. 

- 논리곱
    - 만약 `x`를 `true`로 반환할 수 있으면 `x`를 반환하고, 그렇지 않으면 `y`를 반환합니다.

```jsx
function add(a, b, c) {
  a = a || 0;
  b = b || 0;
  c = c || 0;
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```

ES6에 도입된

매개변수 기본값은 매개변수에 인수를 전달하지 않을경우와 undefined를 전달한 경우에만 유효하다.

```jsx
function add(a = 0, b = 0, c = 0) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6
console.log(add(1, 2)); // 3
console.log(add(1)); // 1
console.log(add()); // 0
```

매개변수의 최대 개수는 정해져 있진 않지만 매개변수는 순서가 있기때문에 많아지는걸 권장하지 않는다. 좋은건 0개 최대 3개정도가 바람직하다.

아니면 객체를 넘겨 key : value로 깔끔하게 관리하는 방법도 있다 이때 내부로 전달한 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 부수효과(side effect)가 발생할수 있다.

<aside>
💡 사이트 이펙트
함수 내부에서 외부에 있는것들을 수정시키는 것을 말한다.

</aside>

## 반환문

- 함수는 return 키워드와 표현식(반환값)으로 이뤄진 반환문을 사용해 실행 결과를 함수 외부로 반환한다.
- 함수 호출은 표현식이다.

- 규칙
    - return이 없으면 undefined 반환
    - return이후에 문은 실행되지 않는다
    - 반환문은 함수 몸체에서만 사용이 가능하다

```jsx
return; // undefined
```

nodejs는 모듈시스템에 의해 파일별로 독립적인 파일 스코프를 갖는다 그래서 파일의 가장 바깥 영역에 반환문을 사용해도 에러가 발생하지 않는다.

## 참조에 의한 전달과 외부 상태의 변경

```jsx
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

객체를 참조값으로 넘기다보면 변경을 추적하기 어려워진다

이를 해결하기위해 객체를 불편값으로 동작하게끔 비용은 비싸지만 깊은복사를 통해 관리해 부수효과를 없앨수 있다.

또한 외부 상태를 변경하지 않고, 외부 상태에 의존하지 않는 함수를 순수함수라고 하는데 이를 기반한 프로그래맹이 함수형 프로그래밍이다.

함수형 프로그래밍은 부수효과를 최대한 억제해서 오류를 피하고 안정성을 높이려는 방식이다.

## 다양한 함수의 형태

- 즉시 실행 함수
    - 기명함수로도 쓸수 있지만 한번만 호출되기때문에 보통 익명함수로 사용한다

```jsx
function foo(){}()
```

함수 선언문인 경우 자바스크립트 엔진이 세미콜론을 붙인다.

function foo(){}; (); 이렇게 되어버려서 함수 호출 연산자가 아닌 그룹연산자로 해석되고 그룹연산자에 피연산자가 없어서 에러가 난다.

```jsx
(); //unexpected token
```

- 즉시 실행 함수도 일반 함수 처럼 값을 반환할수 있고, 인수를 전달할 수도 있다.

```jsx
// 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있다.
var res = (function () {
  var a = 3;
  var b = 5;
  return a * b;
}());

console.log(res); // 15

// 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function (a, b) {
  return a * b;
}(3, 5));

console.log(res); // 15
```

즉시 실행 함수는 변수나 함수 이름의 충동을 방지할 수 있다.

### 중첩함수

- 함수 내부에 정의된 함수를 말한다.
- 중첩함수를 포함하는 함수는 외부 함수라고 부른다

```jsx
function outer() { //외부함수
     var x = 1;
   
     // 중첩 함수,내부함수
     function inner() {
       var y = 2;
       // 외부 함수의 변수를 참조할 수 있다.
       console.log(x + y); // 3
     }
   
     inner();
   }
outer();
```

```jsx
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
```

### 콜백함수

```jsx
// n만큼 어떤 일을 반복한다.
function repeat(n) {
  // i를 출력한다.
  for (var i = 0; i < n; i++) console.log(i);
}

repeat(5); // 0 1 2 3 4
```

여기서 repeat함수는 console.log()에 강하게 의존하고 있다.

반복분내에 처리하는 일이 바뀐다면 함수를 새로 만들어줘야한다

아래와 같다

```jsx
// n만큼 어떤 일을 반복한다.
function repeat1(n) {
  // i를 출력한다.
  for (var i = 0; i < n; i++) console.log(i);
}

repeat1(5); // 0 1 2 3 4

// n만큼 어떤 일을 반복한다.
function repeat2(n) {
  for (var i = 0; i < n; i++) {
    // i가 홀수일 때만 출력한다.
    if (i % 2) console.log(i);
  }
}

repeat2(5); // 1 3
```

위 예제를 보면 함수에서 반복하는 일은 똑같고 이를 처리하는 로직만 다르다는것을 볼 수 있다.

그렇다면 로직을 함수로 추상화하고, 외부에서 내부로 전달하게되면 함수를 여러개 선언할 필요가 사라진다.

```jsx
// 외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i); // i를 전달하면서 f를 호출
  }
}

var logAll = function (i) {
  console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3
```

자바스크립트 함수는 일급객체이기때문에 값으로 사용할 수 있어서 매개변수에 값을 넣어줄 수 있다.

위와 같은 구조로 더욱 유연한 구조를 가질수 있다.

- 콜백함수
    - 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수 ex) logOdds,logAll
- 고차함수
    - 매개변수를 통해 함수의 외부에서 콜백함수를 전달받은 함수 ex) repeat

```jsx
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
repeat(5, function (i) {
  if (i % 2) console.log(i);
}); // 1 3
```

콜백함수는 고차함수에 의해 호출되며 이때 고차함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

고차함수 내부에서만 호출된다면 콜백함수를 익명 함수 리터럴로 정의하면서 곧바로 고차함수에 전달하는게 일반적이다.

```
// logOdds 함수는 단 한 번만 생성된다.
var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 고차 함수에 함수 참조를 전달한다.
repeat(5, logOdds); // 1 3
```

이때 콜백함수로 쓰인 익명함수는 고차함수가 호출될때마다 객체를 생성한다

자주 호출되는 고차함수라면 콜백함수를 정의한 후 함수 참조를 고차 함수에 전달하는게 좋다

위 예제의 logOdds는 딱 한번만 생성된다.

```
// 콜백 함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백 함수를 실행한다.
document.getElementById('myButton').addEventListener('click', function () {
  console.log('button clicked!');
});

// 콜백 함수를 사용한 비동기 처리
// 1초 후에 메시지를 출력한다.
setTimeout(function () {
  console.log('1초 경과');
}, 1000);
```

<aside>
💡 모든 고차함수가 콜백함수를 실행하는것은 아니다
settimeout에 경우 setTimeout이 콜백함수를 호출하지 않는다

</aside>

### 순수함수와 비순수 함수

순수함수는 외부상태에 의존하지 않고 오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성해 반환한다.

순수 함수는 동일한 입력에 대해 항상 동일한 출력을 반환해야 한다

보통 매개변수가 없은 순수함수는 상수와 같다. 그래서 의미가없다 순수함수는 매개변수가 적어도 1개이상이여야 의미가 있다.

외부상태에는 전역변수, 서버 데이터, Console,DOM등이 있다.

만약 외부 상태에는 의존하지 않고, 함수 내부 상태에만 의존한다 해도 그 내부 상태가 호출될때마다 변화하는 값(예 : 현재시간)이라면 순수함수가 아니다

- 순수함수

```jsx
var count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```

- 비순수함수

외부상태에 의존하거나 외부 상태를 변경하는 함수이다.

외부 상태에 의존해서 부수효과가 일어남

```jsx
var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수
function increase() {
  return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```

```jsx
function getCurrentTimePlusOffset(offset) {
    const currentTime = new Date().getTime();
    return currentTime + offset;
}

console.log(getCurrentTimePlusOffset(1000)); // 현재 시간에 1000밀리초를 더한 값을 출력
console.log(getCurrentTimePlusOffset(1000)); // 매번 다른 값을 출력
```

```jsx
function incrementCounter() {
    let counter = 0; // 내부 상태
    counter += 1;
    return counter;
}

console.log(incrementCounter()); // 1을 출력
console.log(incrementCounter()); // 여전히 1을 출력
```

- 내부 상태에 의존하지만 순수 함수가 아닌  비순수 함수

```jsx
function createCounter() {
    let counter = 0; // 내부 상태

    return function() {
        counter += 1; // 내부 상태 변경
        return counter;
    }
}

const incrementCounter = createCounter();

console.log(incrementCounter()); // 1을 출력
console.log(incrementCounter()); // 2를 출력
console.log(incrementCounter()); // 3을 출력
```

똑같은 입력에도 출력이 다르다