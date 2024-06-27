//then을 통해 promise chaining을 만들어
//콜백 헬 문제를 해결할 수 있다.

// const myPromise = new Promise( (resolve,reject)=>{
//     console.log("호출") //아래 코드를 주석처리해도 "호출"이 출력된다.
//     setTimeout( ()=>{
//         const text ="성민";
//         console.log("예약 함수 호출")
//         if(text === '성민'){
//             resolve("이름은 성민 입니다")
//         }
//         else{
//             reject("이름은 성민이 아닙니다")
//         }
//     },2000)
// })


// myPromise
// .then( (result)=>{
//     console.log(result);
//     return `선물은 : ${result}`;
// })
// .then(  (result)=>{
//     console.log(result);
// })
// .catch((err)=>{
//     console.log(err);
// })
// .finally(()=>{
//     console.log()
// })


//프로미스 객체를 통해 순차적으로 실행하도록 만든것

fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
.then( response =>{
    return response.json();
})
.then( data =>{
    console.log('data : ', data)
    return data.filter(obj => obj.id>3)
})
.then(result =>{
    console.log('result : ', result)
})
.catch((err)=>{
    console.error('err : ', err)
})
.finally(()=>{

});