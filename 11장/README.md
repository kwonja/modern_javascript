# [11장]원시 값과 객체의 비교
- 원시타입
    - 변경이 불가능한 값
- 객체타입
    - 변경이 가능한 값

## 원시 값

### 변경 불가능한 값(불변성)

한번 생성된 원시값은 **읽기 전용값**으로 변경할 수 없다.

```jsx
var score;
score=80;
score=90;
```

원시값은 변경이 불가능하기때문에 재할당을 통해 변수 값을 변경해야한다.

이렇게 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한것을 **불변성**이라고 한다.

불변성을 갖는 원시값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없다.

이러한 불변성의 특성은 데이터를 신뢰할수 있다는 장점이 있다.

재할당이 아닌 방법으로 원시값을 바꿀수있다면 예기치 않게 변수 값이 변경될수 있다는것을 의미한다. 이는 값의 변경 즉 상태 변경을 추적하기 어렵게 만든다.

 

### 문자열도 불변성을 가진다!!

```jsx
var str = "Hello"
str = 'world';
```

위와 같은 경우

Hello가 메모리에 할당되어 str이 해당 주소를 가리키고 있다가

world를 가지고 있는 메모리가 재할당되고, str이 새로 가리키게된다.

<aside>
💡 변경되는것이 아닌  새로 재할당을 한다는것이다!

</aside>

```jsx
var str= 'string';
console.log(str[0]); //s
str[0]='S';
console.log(str[0]); //s
```

String으로 바꾸고싶다면 새로 할당해주면 된다.

### 문자열은 유사 배열 객체

문자열에서 str[0]와 같이 배열처럼 인덱스에 접근할수 있다는 사실을 알고 있을것이다.또한 객체처럼 length라는 프로퍼티를 사용할수도 있다. 그래서 유사 배열 객체라고 부른다

```jsx
var str= 'string';
console.log(str[0) //s
console.log(str.length); //6
console.log(str.toUpperCase()); //STRING
```

## 객체

자바스크립트에서 객체는 해쉬테이블을 통해 관리한다.

자바스크립트는 c,java와 같이 클래스를 선언하지않고 객체를 자유롭게  생성할수 있다 또한 프로퍼티를 동적으로 생성이 가능하다.

변수는 생성된 객체를 참조하는 주소를 가지고 있다.

또한 객체는 많은양을 가지고 있을수 있기때문에 변경하고싶을때마다 새로 할당을 해주게되면 메모리에 부담이 크기때문에 생성된 메모리주소에서 변경이 가능하도록 설계되었다.

### 변경가능한 값

객체타입의 값, 즉 객체는 변경 가능한 값이다.

그렇기때문에 여러개의 식별자가 하나의 객체를 가리킬수 있게된다.

```jsx
const obj = {x: {y:1}};

//얕은복사
const c1={...obj};
console.log(obj===c1); //false
console.log(obj.x ===c1.x); // true

const _ = require('lodash');
//깊은 복사
const c2=_.cloneDeep(obj);
console.log(c2 ===obj); //false
console.log(c2.x ===obj.x); //false
```

얕은복사와 깊은복사로 생성된 객체는 원본과는 다른 객체다.

- 얕은복사
    - 객체에 중첩되어 있는 객체의 경우 참조 값을 복사한다
- 깊은복사
    - 중첩되어 있는 객체까지 모두 복사해서 원시값처럼 완전한 복사본을 만든다는 차이가 있다.

```jsx
var person = {
    name : 'Lee'
}

//참조값을 복사(얕은 복사)
var copy=person;

console.log(person === copy);

copy.name ='Kim';
person.address='Seoul';

//copy와 person은 동일한 객체를 가리킨다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받을 수 있다
console.log(person); //{ name: 'Kim', address: 'Seoul' } 
console.log(copy); //{ name: 'Kim', address: 'Seoul' } 
```

```jsx
var a= {
name : 'Lee'
}

var b= {
name : 'Lee'
}

console.log(a===b) //false
//객체를 생성할때는 다른 메모리에 생성된다.
console.log(a.name === b.name) //true
//값에 의한 비교는 Lee로 같다
```