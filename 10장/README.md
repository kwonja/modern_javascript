# [10장] 객체 리터럴
자바스크립트를 구성하는 거의 “모든 것”이 객체라고 할 수 있다.

원시값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)은 모두 객체라고 할 수 있다.

- 원시 타입
    - 변경 불가능한 값(immutable value)
- 객체 타입의 값
    - 변경이 가능한 값(mutable value)

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키(key),값(value)로 구성된다.

```jsx
var person = {
	name : 'lee',
	age : 20	
}
```

자바스크립트의 모든 값은 프로퍼티 값이 될 수 있다.

자바스크립트의 함수는 일급객체이므로 값으로 취급할수 있고, 함수 역시 프로퍼티 값으로 사용할 수 있다.

프로퍼티 값이 함수 일 경우 함수와 구분하기 위해 메서드 라고 부른다

```jsx
var counter = {
	num : 0,
	increase : function(){
	  this.num++;
  }
}
```

이처럼 객체는 프로퍼티와 메서드로 구성된 집합체이다,

<aside>
💡 객체를 사용하는 이유?
상태와 동작을 하나의 단위로 구조화 할 수 있어서 유용하기 때문!

</aside>

<aside>
💡 인스턴스란?

클래스에서 생성된 객체가 실제 메모리를 할당받아 존재하는것을 말한다

</aside>

### 자바스크립트 객체 생성 방법

1. 객체 리터럴
2. Object 생성자 함수
3. 생성자 함수
4. Object.create 메서드
5. 클래스(ES6)

- 리터럴
    - 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법을 말한다

여기서 말하는 객체 리터럴의 표기법은 {} 이다.

변수에 객체가 할당되는 시점에 자바스크립트 엔진이 객체 리터럴을 해석해 객체를 생성한다.

```jsx
var person = {
name : 'Lee',
sayHello : function(){
    console.log(`Hello my name is ${this.name}`);
}
}

console.log(person); //{ name: 'Lee', sayHello: [Function: sayHello] }
console.log(typeof person); //object
```

중괄호 내에 아무것도 없으면 빈 객체이다

```jsx
var empty = {};
console.log(empty);
```

코드 블록을 의미하는 중괄호는 ;을 붙이지 않는다.

객체 리터럴의 중괄호는 코드 블록이 아니기때문에 닫는 중괄호에는 ;을 붙여야 한다.

## 프로퍼티

객체는 프로퍼티의 집합이며 프로퍼티는 키와 값으로 구성된다.

```jsx
var person = {
	name : 'lee',
	age : 20	
}
```

프로퍼티를 구분할때는 ,(콤마) 로 맨마지막에는 있어도 되고 없어도 된다

- 프로퍼티 키
    - 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값
    - 자바스크립트에서 사용할 수 있는 모든 값

키는 반드시 식별자 네이밍 규칙을 따라야하는것은 아니지만

차이가 존재한다.

심벌 값도 키로 사용할수 있지만 일반적으로 문자열을 사용

- 식별자 네이밍 규칙을 따르는 이름은 따옴표 필요 x
- 식별자 네이밍 규칙을 따르지 않는 이름은 따옴표 필요

```jsx
var person = {
    firstName : 'John',
    'last-name' : 'Lee'
};

console.log(person); // { firstName: 'John', 'last-name': 'Lee' }
```

네이밍을 따르는 키는 따옴표가 없지만

네이밍을 따르지 않는 키는 따옴표가 생겨서 나온다

```jsx
last-name : 'Lee'
```

따옴표가 없는 경우를 생각해보면

자바스크립트 엔진은 -연산자를 보고 표현식으로 해석할 것이다. //에러

- 표현식을 사용해 동적으로 키를 생성

```jsx
var obj={};
var key='hello';

//ES6 프로퍼티 키 동적 생성
obj[key]="world";

//ES6
var obj={ [key] : 'wolrd'};
console.log(obj);
```

빈 문자열을 키로 사용할 수 있지만 키로써 의미가 없기때문에 권장하지 않는다

```jsx
var foo = {
	'' : ''
}
console.log(foo); // {"" : ""}
console.log(foo['']) // ''
```

키에 문자열이나 심벌 값을 제외한 나머지값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.

```jsx
var foo = {
	0 : 1,
}

console.log(foo)  {0:1} // 키는 문자열
```

var나 function같은 예약어 프로퍼티를 사용해도 에러는 발생하지 않으나 예상치 못한 에러를 만날수도 있으니 권장하지 않는다

```jsx
var foo = {
	name : 'Lee',
	name : 'Kim'
}

console.log(foo.name) // Kim
```

중복되는 키가 있으면 나중에 호출된 값으로 덮어쓴다

## 메서드

```jsx
var circle = {
    radius : 5,

    getDiameter : function(){
        return 2* this.radius; //this를 안쓰면 객체 안 프로퍼티의 키 인지 인지를 못함(not defined 에러발생 )
    }
}
console.log(circle.getDiameter());
```

## 프로퍼티 접근

- 마침표 프로퍼티 접근 연산자(.) 마침표 표기법
- 대괄호 프로퍼티 접근 연산자[…] 대괄표 표기법

```jsx
var person = { name : 'Lee'};

//마침표 표기법(.)에 의한 프로퍼티접근
console.log(person.name);
//대괄표 표기법[]에 의한 프로퍼티 접근
console.log(person['name']);

let a = "name";
//식별자에 알맞은 key를 넣으면 사용할 수 있다.
console.log(person[a]);//이렇게 쓰면 식별자로 인식한다.

console.log(person[age]);  // age가 존재하지 않아 에러를 발생시킨다
```

객체에 존재하지 않는 프로퍼티에 접근하면 undefined 반환

에러를 발생시키지 않는점을 알고 있자

```jsx
var person = {
	name : 'Lee'
}

console.log(person.age); // undefined
```

**네이밍 규칙을 지키지 않은 키는 무조건 따옴표를 사용해야한다**

단, 숫자의 경우는 따옴표를 생략해도 된다

이를 제외하고는 모두 따옴표로 표기해야한다.

```jsx
var person = {
    'last-name' : 'Lee',
    1 : 10,
}

 // person.'last-name'; //unExpected string
 // person.last-name; // 브라우저 환경 NaN
                      // Node.js 환경 name is not defined
 person[last-name]; //last not defined
 person['last-name']; //Lee

//프로퍼티가 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.

// person.1;  // unexpected number
// person.'1' // unexpected string

person[1]; // 10
person['1']; //10
```

네이밍 규칙을 어긴 키들은 마침표 표기법으로 표현할 수 없다.

<aside>
💡 person.last-name이 환경마다 값이 다른이유

</aside>

브라우저 widnow 객체에는 name이 빈 문자열로 존재한다

그래서 person.last → undefined  name → ‘’이라 빼기 연산자가 비교하기위해 각각을 숫자로 암묵적 변환을 하려고하는데 undefined는 숫자로 될수 없어 평가가 안되 NaN으로 나오는 것이다.

Node.js는 name이 없기때문에 name is not defined 에러가 발생한다.

## 프로퍼티 값 갱신

이미 존재하는 프로퍼티에 값을 새로 갱신하면 갱신한 값으로 바뀐다.

## 프로퍼티 동적 생성

```jsx
var person = {
	name : 'Lee'
}

person.age=20;
console.log(person); // {name : Lee, age : 20}
```

## 프로퍼티 삭제

- delete 연산자 사용

```jsx
var person = {
	name : 'Lee',
	age : 20
}

delete person.age;

delete person.address //address라는 프로퍼티가 없어 삭제는 못하지만 이때 에러는 발생하지 않는다.
```

## ES6에서 추가된 객체 리터럴의 확장 기능

```jsx
//ES5
var x=1, y=2;

var obj = {
    x : x,
    y : y
}
console.log(obj);

//ES6
var obj={x,y};
console.log(obj);
```

변수이름과 프로퍼티가 동일할때는 프로퍼티 키를 생략해도 괜찮다.

다르게 하려면 es5처럼 해야한다.

### 계산된 프로퍼티 이름

문자열변환으로 동적으로 키를 생성하면 []를 사용해야한다

```jsx
//ES5
var prefix ='prop'
var i=0;
var obj={};

obj[prefix + '-' + ++i]=i;
console.log(obj); //{ 'prop-1': 1 }
//{prop1}인 경우는 네이밍을 지켰기때문에 따음표로 표현되어 출력되지 않음!
```

```jsx
//ES6
var prefix ='prop'
var i=0;
var obj={
    [`${prefix}-${++i}`] : i,
};
console.log(obj); //{ 'prop-1': 1 }

```

### 메서드 축약 표현

```jsx
//ES5
var person = {
name : 'Lee',
sayHello : function(){
    console.log(`Hello my name is ${this.name}`);
}
}

//ES6
var person = {
    name : 'Lee',
    sayHello(){
        console.log(`Hello my name is ${this.name}`);
    }
}
//function을 생략해서 사용할 수 있다.
//ES6에서 축약한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다

```