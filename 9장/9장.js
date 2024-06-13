console.log("9장");

var x = 10;
var str = x.toString();
console.log( typeof x); //number
console.log( typeof str); //string
(10).toString();


// 문자열 타입 변환
console.log( 1 + "2");
console.log( "2" + 1);

console.log(!-0); //true //-0은 0처럼 인식한다.

// console.log( (Symbol())+'' );

let a= {x:1, y:1};
console.log(a +""); //object Object
console.log(false + 3); //3
console.log(true + true); //2 산술연산자에 불리언이나 숫자가 있으면 산술연산자



if('')console.log("1");
if(true)console.log("2");  //2
if(0)console.log("3");
if('str')console.log("4"); //4
if(null)console.log("5");



//1. String 생성자 함수를 new 연산자 없이 호출 하는 방법

//숫자 -> 문자열
String(1); //"1"
String(NaN); // "NaN"
String(Infinity); // "Infinity"

//불리언 -> 문자열 타입
String(true); // "true"
String(false); // "false"

//2. Object.prototype.toString

(1).toString(); // "1"
(NaN).toString(); //"NaN"


//3. 문자열 연결 연산자를 이용하는 방법
1 + '';



//단축평가를 사용해 if문 사용안해보기
var done = true;
var message="";
//주어진 조건문이 true일때
if(done)message='완료';

message = done && "완료"; //코드블럭을 줄일수 있다.
console.log(message);



console.log('cat' && 'dog'); //dog
console.log(!'cat'); //false