# [17장] 생성자 함수에 의한 객체 생성

### 자바스크립트 객체 생성 방법

1. 객체 리터럴
2. Object 생성자 함수
3. 생성자 함수
4. Object.create 메서드
5. 클래스(ES6)

## 2.Object 생성자 함수

```jsx
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

### 생성자 함수에 의한 객체 생성 방식의 장점

```jsx
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

new 연산자를 통해 생성자 함수로 인식하고 인스턴스로 생성할수 있다.

| 함수 호출 방식 | this가 가리키는 값(this 바인딩) |
| --- | --- |
| 함수 호출 방식 | 전역 객체 |
| 일반 함수로서 호출 | 매서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

### this 바인딩 예제1

```jsx
// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
    console.log(this);
  }
  
  // 일반적인 함수로서 호출
  // 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
  foo(); // window
  
  // 메서드로서 호출
  const obj = { foo, a:1 }; // ES6 프로퍼티 축약 표현
  console.log(obj); //{ foo: [Function: foo], a: 1 }
  obj.foo(); // obj === { foo: [Function: foo], a: 1 }

// 생성자 함수로서 호출
const inst = new foo(); // foo {} 객체로 인식되어 출력된다.
```

### this 바인딩 예제2

```jsx
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.
// 즉, 일반 함수로서 호출된다.
const circle3 = Circle(15);

// 일반 함수로서 호출된 Circle은 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3); // undefined

// 일반 함수로서 호출된 Circle내의 this는 전역 객체를 가리킨다.
console.log(radius); // 15
```

Circle이 일반함수로 사용되어

this.radius는 window.radius로 인식되어 전역 변수로 사용된다.

생성자 함수로 인스턴스를 생성하면 암묵적으로 빈 객체를 생성한다.

이 객체가 인스턴스가 되고,  해당 인스턴스는 this에 바인딩 된다.

이게 생성자 함수의 this가 생성할 인스턴스를 가리키는 이유이다.

해당 this 바인딩은 함수 몸체가 실행되는 런타임 이전에 실행된다.

### 인스턴스 반환

```
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
  return {};
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // {}
```

return으로 명시적인 객체를 리턴하면 해당 객체가 리턴된다.

별다른 리턴이 없으면, this를 반환한다.

```jsx
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
  return 100;
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}
```

원시값을 리턴하면 무시되고, this를 반환한다.

근데 이러한 반환은 생성자 함수의 기본 동작을 훼손하기때문에 return문을 반드시 생략한다.

```jsx
// 함수는 객체다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메서드를 소유할 수 있다.
foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10
```

함수도 객체이기때문에 프로퍼티와 메소드를 가질 수 있다.

```jsx
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();
```

```jsx
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
  x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo();   // -> foo {}
new bar();   // -> bar {}
new baz.x(); // -> x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만을 메서드로 인정한다.
const obj = {
  x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor
```

일반 함수로 정의된 함수만이 constructor이다

화살표 함수와 ES6 메소드 축약은 constructor로 선언될수 없다

```jsx
const arrow = () =>{
    let radius=1;
  }
  new arrow(); //arrow is not a constructor
```

둘다 [CALL]로 호출할 수있다 → 함수호출이 가능하다. `arrow()`

### Scope-Safe Constructor Pattern

생성자함수로만 사용하고싶다면?

```jsx
// Scope-Safe Constructor Pattern
function Circle(radius) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
  // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
  // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) {
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```