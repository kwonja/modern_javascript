

//불변값
var score;
score=80;
score=90;



var str = "Hello"
str = 'world';


var str= 'string';
console.log(str[0]); //s
str[0]='S';
console.log(str[0]); //s


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



