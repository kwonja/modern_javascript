
var arr = [];
console.log(arr.length); //0

var obj ={};
obj.length; //undefined  --> 객체는 길이를 구하는 메소드가 없음

console.log([10,20] + ""); // "10,20"
console.log([] + "1"); //"1"



//10장


var person = { name : 'Lee'};

//마침표 표기법(.)에 의한 프로퍼티접근
console.log(person.name);
console.log(person['name']);

let a = "name";
//식별자에 알맞은 key를 넣으면 사용할 수 있다.
console.log(person[a]);//이렇게 쓰면 식별자로 인식한다.


var person = {
name : 'Lee',
sayHello : function(){
    console.log(`Hello my name is ${this.name}`);
}
}

console.log(person); //{ name: 'Lee', sayHello: [Function: sayHello] }
console.log(typeof person); //object

var empty = {}
console.log(empty);



//식별자 네이밍
var person = {
    firstName : 'John',
    'last-name' : 'Lee'
};

console.log(person);


var obj={};
var key='hello';

//ES6 프로퍼티 키 동적 생성
obj[key]="world";

//ES6
var obj={ [key] : 'wolrd'};
console.log(obj);

var foo = {
    "" : "",
}
console.log(foo['']);


var circle = {
    radius : 5,

    getDiameter : function(){
        return 2* this.radius;
    }
}
console.log(circle.getDiameter());


var person = {
    'last-name' : 'Lee',
    1 : 10,
}

 // person.'last-name'; //unExpected string
 // person.last-name; // 브라우저 환경 NaN
                      // Node.js 환경 name is not defined
 // person[last-name]; //last not defined
 person['last-name']; //Lee

//프로퍼티가 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다.

// person.1;
// person.'1'

person[1]; // 10
person['1']; //10



//ES6 객체 리터럴

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

//ES5
var prefix ='prop'
var i=0;
var obj={
    [`${prefix}-${++i}`] : i,
};

obj[prefix + '-' + ++i]=i;
console.log(obj); //{ prop-1: 1 }


//메서드 축약 표젼

var person = {
    name : 'Lee',
    sayHello : function(){
        console.log(`Hello my name is ${this.name}`);
    }
}

var person = {
    name : 'Lee',
    sayHello(){
        console.log(`Hello my name is ${this.name}`);
    }
}
//function을 생략해서 사용할 수 있다.
//ES6에서 축약한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다
