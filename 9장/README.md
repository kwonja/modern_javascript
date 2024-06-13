# [9장]타입 변환과 단축 평가
---

# 타입변환

### 명시적 타입 변환 |  타입 캐스팅

개발자가 의도적으로 값의 타입을 변환하는것을 말한다

```jsx
//명시적 타입 변환
//숫자를 문자열로 타입 캐스팅한다
var x = 10;
var str = x.toString();
console.log( typeof x); //number
console.log( typeof str); //string
```

x 변수의 값이 변경된것은 아니다.

### 암묵적 타입 변환 | 타입 강제 변환

개발자의 의도와는 상관없이 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 변환된다.

```jsx
var x= 10;

//암묵적 타입 변환
//문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.

var str = x + '';
console.log(typeof str, str); //string

//x 변수의 값이 변경된 것은 아니다
console.log(typeof x) //number
```

타입 변환이란 기존 원시값(10처럼 불변한 값)을 사용해 다른 타입의 새로운 원시값을 생성하는 것이다.

암묵적 타입 변환은 기존 변수 값을 재할당하여 변경하는것이 아니다.

자바스크립트 엔진은 표현식을 에러 없이 평가하기 위해 피연산자의 값을 암묵적 타입 변환해 새로운 타입의 값을 만들어 단  한 번 사용하고 버린다.

### 암묵적 타입 변환은 에러를 발생시킬수 있는데 왜 사용할까?

명시적으로 표현하게되면 에러없이 사용할수 있기에 효과적이라고 할 수 있다.

하지만 **암묵적 변환이 코드예측을 할 수 있다면 가독성 측면에서 효과**를 볼 수 있다.

```jsx
//명시적 변환
(10).toString()

//암묵적 변환
10 + ""
```

위 코드를 보면 암묵적 변환이 더 간결하다는것을 볼 수 있다.

이렇게 암묵적 변환을 사용하려면 변환을 예측할수 있어야한다

# 암묵적 타입 변환

### 문자열 타입으로 변환

```jsx
// 문자열 타입 변환
console.log( 1 + "2"); // 12
console.log( "2" + 1); // 21
```

+연산자는 피연산자중 **하나라도 문자열**이면 문자열 연결 연산자로 동작한다

문자열을 만들어야하기때문에 모든 피연산자를 문자열로 바꿔서 평가한다.

**표현식 삽입**

```jsx
`1 + 1 = ${1+1}`   => '1+1 = 2'
```

ES6문법인 빽틱은 **표현식 삽입**이라고 부르며

표현식의 평가 결과를 문자열 타입으로 암묵적으로 변환한다.

```jsx
//숫자 타입

0 + '' // "0"
-0 + '' // "0"   -0을 0처럼 인식한다
1 + '' // "1"
-1 + '' // "-1"
NaN + '' // "NaN"
Infinity + "" // "Infinity"
-Infinity + "" // "-Infinity"

//불리언 타입

true + '' // "true"
false + '' // "false"

//null 타입
null + '' // 'null'

//undefined 타입
undefined + '' // "undefined"

//심벌 타입  문자열로 바꿀수 없음 에러 발생
(Symbol()) + '' //cannot convert a Symbol value to a string

//객체 타입

//객체는 안에 어떤 속성이든 오른쪽처럼 값이 나옴
({}) + '' // [object Object]
Math + '' // [object Math]
//배열의 경우 안에 있는 인덱스를 문자열로 암묵적 변환을 진행
[] + ''  // ""
[10,20] + '' // "10,20"
(function(){}) + '' //function(){}
Array + '' // function Array() {[native code]}
```

### 숫자타입으로 변환

- 산술연산자일경우(+같은경우는 피연산자중 하나라도 문자열이면 문자열 연결 연산자로 인식)

```jsx
//산술연산자의 경우

1- '1'  //0
1 * '10' //10
1 / 'one' // NaN
```

‘one’을 숫자로 타입변환이 안되기때문에 표현식을 숫자가 아니라는 NaN이라는 값으로 평가한다.

- 비교연산자의 경우

비교연산자는 크기를 비교한다

불리언을 만들기위해서는 비교대상이 되는 피연산자가 숫자여야한다.

```jsx
'1' > 0  -->  1 > 0    //true
```

- + 단항 연산자의 경우

```jsx
//문자열 타입
+'' // 0
+'0' //0
+'1' //1
+'string' // NaN

//불리언타입
+true //1
+false //0

//null 타입
+null //0

//undefined
+undefined // NaN

//심벌 타입
+Symbol() // //cannot convert a Symbol value to a string

//객체 타입
+{}   //NaN
+[]  //0
+[10,20] //NaN
+(function(){}) //NaN
```

 

### 불리언 타입으로 변환

```jsx
if('')console.log("통과")
```

```jsx
if('')console.log("1");
if(true)console.log("2");  //2
if(0)console.log("3");
if('str')console.log("4"); //4
if(null)console.log("5");
```

조건문은 논리적인 참/거짓으로 평가하는 표현식이다.

그런데 불리언의 true/false가 아닌

자바스크립트 엔진은 Truthy 값(참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분한다.

- Falsy
    - false
    - undefined
    - null
    - 0, -0
    - NaN
    - ‘’(빈 문자열)

Falsy값 외에 모든 값은 모두 true로 평가되는 Truthy 값이다.

Truthy값을 true로 쓰고싶다면 !!(not 연산자2번)으로 해준다

!은 불리언을 반환해주기때문에 truthy → false → true로 바꿔줄수 있다.

# 명시적 타입 변환

<aside>
💡 표준 빌트인 생성자 / 메서드
자바스크립트에서 기본 제공하는 생성자와 메서드 이다.
생성자는 new 연산자와 함께 호출, 메서드는 바로 사용할 수 있다.

</aside>

### 문자열 타입으로 변환

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toString 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```jsx
//숫자 -> 문자열
String(1); //"1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"

//불리언 -> 문자열 타입
String(true); // "true"
String(false); // "false"

//2. Object.prototype.toString

(1).toString(); // "1"
(NaN).toString(); // "NaN"
(Infinity).toString(); // "Infinity"

(true).toString();    // "true"
(false).toString();   // "false"

//3. 문자열 연결 연산자를 이용하는 방법
1 + '';
NaN + '';
Infinity + '';

true + '';
false + '';
```

### 숫자 타입으로 변환

1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
2. parseInt,parseFloat 함수를 사용하는 방법
3. +단항 산술 연산자를 이용하는 방법
4. *산술 연산자를 이용하는 방법

```jsx
//1. Number 생성자 함수
//문자열 타입 -> 숫자 타입

Number('0') // 0
Number('-1') // -1
Number('10.53') // 10.53

Number(true) //1
Number(false) //0

//2. 함수를 이용하는 방법(문자열만 가능)
parseInt('0')
parseInt('-1')
parseFloat('10.53') //10.53

//3. + 단항 산술 연산자를 이용하는 방법
+'0' // 0
+'-1' // -1
+'10.53' // 10.53

//불리언타입 -> 숫자
+true //1
+false //0
false + 3 //3
console.log(false + 3); //3
console.log(true + true); //2 
// 산술연산자에 불리언이나 숫자가 있으면 산술연산자

//4. 산술 연산자를 이용하는 방법
'0'*1 //0
'-1'*1 //-1
'10.53'*1  //10.53

//불리언 -> 숫자 타입
true * 1  // 1
false * 1 // 0
```

### 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
    1. 파라미터로 truthy가 오면 true를 반환
2. ! 부정논리 연산자를 두번 사용하는 방법

```jsx
//1
Boolean('x') //true

//객체 타입 -> 불리언타입
Boolean({}); //true
Boolean([]); //true

//2
!!'x' // true
```

# 단축평가

### 논리 연산자를 사용한 단축평가

—> 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지  평가를 생략하는것을 말한다.

논리곱은 앞에 true가 되면 뒤에 연산을 하지 않고

논리합은 앞에 false가 되면 뒤 연산을 하지 않는다.

자바스크립트는 신기하게

불리언값을 반환하는게 아닌 대상을 반환한다

```jsx
'cat' || 'dog'  //'cat'

//cat은 truthy라서 참이라고 할수 있는 값이다
```

위 식을 보면 truthy값이라서 true로 해석이 되는데 반환값은 ‘cat’인 원래값을 반환한다

논리합/논리곱은 true와 같은 **불리언으로 반환하지 않는다는점**을 기억하자!

단축평가를 통해 if문을 사용하지 않을수도 있다.

- true인 값으로 무엇을 하고 싶을때

```jsx
//단축평가를 사용해 if문 사용안해보기
var done = true;
var message="";
//주어진 조건문이 true일때
if(done)message='완료';

message = done && "완료"; //코드블럭을 줄일수 있다.
console.log(message);
```

- flase인 값으로 무엇을 하고 싶을때 논리곱 사용

```jsx
//단축평가를 사용해 if문 사용안해보기
var done = false;
var message="";
//주어진 조건문이 true일때
if(!done)message='미완료';

message = done || "미완료"; //코드블럭을 줄일수 있다.
console.log(message);
```

- 삼항연산자는 if…else를 대체할수 있다.

```jsx

message = done ? "완료" : "미완료"
```

- 객체를 가리키기를 기대하는 변수가 null 혹은 undefined가 아닌지 확인하고 싶을때 유용

```jsx
//bad
var elem=null
var value=elem.value
// cannot read property value 에러 발생
```

```jsx
//good
var elem=null
var value = elem && elem.value;
```

이렇게 사용하면 elem가 null이여서 .value에 접근할수없다는 에러를 피할수 있다.

if-else를 막사용하다보면 코드가 길어지고 가독성이 떨어지기에 아주 효율적이다.

- 함수 매개변수에 기본값을 설정할때

undefined로 인해 관련 프로퍼티를 사용할때 발생하는 에러를 사전에 방지할수 있다

```jsx
function getStringLength(str =""){ //매개변수에 기본값을 넣는건 es6문법
	str = str || '';
	return str.length;
}
```

### 옵셔널 체이닝 연산자(?.)

```jsx
var elem=null;
var value = elem?.value; // null
```

?.을 사용해

elem이 undefined나 null이면 undefined를 반환하고 아니면 우항 프로퍼티를 반환한다.

옵셔널 체이닝 연산자가 나오기전에는 &&연산자를 많이 사용했다.

```jsx
var str='';
var length = str && str.length;

console.log(length) // ''
```

‘’도 0의 길이를 가지는데 길이가 아닌 ‘’가 출력된다

```jsx
var str=''

var length = str?.length;

console.log(length) //0 
```

?.의 경우 null또는 undefined가 아니면 우항의 프로퍼티를 참조한다.

length가 프로퍼티라고 하는것으로 문자열이 객체라는것을 유추해볼수 있다.

### null 병합 연산자(??)

좌항이 undefined 또는 null인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.

```jsx
var foo = null ?? 'default string'
//foo -> 'default string'
```

|| 으로 기본값을 설정한다면

좌항이 Fasly값중에 ‘’이나 0으로 초기화를 하려고하면 에러가 날수 있다.

그래서 ?? 연산자를 통해 초기화시 Falsy가 아닌 null, undefined일때만 기본값을 설정하는 코드로 사용할수 있게 되었다.

```jsx
var foo = '' || 'default string'
foo --> 'default string'

var foo = '' ?? 'default string'
foo --> ''
```

보면 논리곱과 논리합으로 단축변환을 하던것을 ECMAScript2020에서 ?.과 ??이 도입되어 기본값을 설정할때 유용해졌다.