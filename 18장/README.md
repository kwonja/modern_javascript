# [18장] 함수와 일급 객체

## 일급객체의 조건

- 무명의 리터럴로 생성할 수 있다.
- 변수나 자료구조(객체, 배열)
- 함수의 매개변수에 전달할 수 있다.
- 함수의 반환값으로 사용할 수 있다.

```jsx
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease };

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
  let num = 0;

  return function () {
    num = aux(num);
    return num;
  };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

- 함수 객체
    - 호출할 수  있다
    - 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.
- 일반 객체
    - 호출할 수 없다.

## 함수 객체의 프로퍼티

함수는 객체다. 따라서 함수도 프로퍼티를 가질수 있다.

`console.dir()` 로 함수 객체의 내부를 볼 수 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a858fa0d-64c8-4449-950c-9b47a942d816/a9401185-b452-4033-a04e-1d031148230c/Untitled.png)

```jsx
function square(number) {
  return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));
/*
{
  length: {value: 1, writable: false, enumerable: false, configurable: true},
  name: {value: "square", writable: false, enumerable: false, configurable: true},
  arguments: {value: null, writable: false, enumerable: false, configurable: false},
  caller: {value: null, writable: false, enumerable: false, configurable: false},
  prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(square, '__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

'__proto__' 접근자 프로퍼티는 Object.prototype 객체의 프로퍼티이고, 모든 함수객체는 이를 상속받고 있어, 모든 객체가 사용할수 있다.

### Arguments 프로퍼티

```jsx
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply());        // NaN
console.log(multiply(1));       // NaN
console.log(multiply(1, 2));    // 2
console.log(multiply(1, 2, 3)); // 2
```

argument 객체는 유사배열 객체이다.

- length라는 프로퍼티를 가짐
- 인덱스로 접근이 가능하다

함수인수를 매개변수의 개수보다 초과하면 버려지는것으로 알고 있는데,

사실을 버려지는건 아니다.

argument객체가 순서대로 인수값을 저장하고 있다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a858fa0d-64c8-4449-950c-9b47a942d816/a0726d98-5fe8-400b-ae18-7028c3a543d8/Untitled.png)

argument객체의 

calle프로퍼티는 호출되어 argument객체를 생성한 함수, 즉 함수 자신을 가리키고,

length 프로퍼티는 인수의 개수를 가리킨다.

arguments객체는 가변 인자 함수를 구현할때 유용하다

ES6에 오면서

- 유사배열 객체이면서, 이터러블의 특징을 가진다(34장에서 자세히 배울 예정)

유사배열객체는 배열이 아니기때문에 배열 메서드를 사용할수 없다.

- Function.prototype.call
- Function.prototype.apply

위 두가지를 사용해 간접적으로 사용해 호출할수 있긴 하다(대신 번거로움) 27장에서 마저 살펴볼 예정

```jsx
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

이러한 번거로움을 ES6의 Rest 파라미터로 해결할 수 있다.

```jsx
// ES6 Rest parameter
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

Rest 파라미터를 통해 가변인수에 대해서 배열로 받아 배열메서드를 사용할수 있게 되었다. → 26.4절에서 자세히 살펴보자

### caller 프로퍼티

함수 자신을 호출한 함수를 가리킨다.

```jsx
function foo(func) {
  return func();
}

function bar() {
  return 'caller : ' + bar.caller;
}

// 브라우저에서의 실행한 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : null
```

node.js에서는 결과가 다들수  있다. 이것은 모듈때문이다.

### length 프로퍼티

```jsx
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

함수객체의 length → 매개변수 개수

arguments의 length → 들어오는 인자의 개수

### name 프로퍼티

```jsx
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

함수 이름을 나타낸다.

ES5 → 익명 함수 표현식일때 빈 문자열을 가진다

ES6 → 익명 함수 표현식일때 함수 객체를 가리키는 변수 이름을  값으로 갖는다.

### '__proto__' 접근자 프로퍼티

```jsx
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false
```

모든 객체는 [[Prototype]]이라는 내부 슬롯을 가진다

 직접적으로는 접근이 불가능하고, '__proto__’을 사용해 간접적으로 접근이 가능하다.

### prototype 프로퍼티

생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티이다.

일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.

```jsx
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // -> false
```

함수가 객체를 생성하는 생성자 함수로 호출될때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

객체 리터럴은 일반 객체 생성 방법이다.

```jsx
function Person(name, age) {
    this.name = name;  // 인스턴스 속성
    this.age = age;    // 인스턴스 속성
}

Person.prototype.sayHello = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

let person1 = new Person('Alice', 30);
let person2 = new Person('Bob', 25);

console.log(person1.hasOwnProperty('name'));  // true
console.log(person1.hasOwnProperty('sayHello'));  // false

console.log(Person.prototype.hasOwnProperty('sayHello'));  // true

```

name과 age는 인스턴스에 속하는 속성이고

prototype 프로퍼티에 추가한 메서드 및 변수는 Person생성자함수내에 존재하여 모든 인스턴스에서 공유가 가능하다.

주의할점은 인스턴스에 prototype으로 선언한 메소드는 존재하지는 않는다.