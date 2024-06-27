
//프로미스 생성
// 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.
// promise는 비동기작업에 많이쓰이지만 객체 자체는 비동기가 아니다


//프로미스는 then을 호출할때 실행되는것이 아니라 생성과 동시에 호출됨
//대기(pending): 이행하지도, 거부하지도 않은 초기 상태.
//이행(fulfilled): 연산이 성공적으로 완료됨.
//거부(rejected): 연산이 실패함.

const myPromise = new Promise( (resolve,reject)=>{
    console.log("호출") //아래 코드를 주석처리해도 "호출"이 출력된다.
    setTimeout( ()=>{
        const text ="성민";
        console.log("예약 함수 호출")
        if(text === '성민'){
            resolve("이름은 성민 입니다")
        }
        else{
            reject("이름은 성민이 아닙니다")
        }
    },2000)
})
console.log(myPromise); //예약상태가 호출이 안되서 대기 상태인것 같다.
myPromise.then( (result)=>{
    console.log(myPromise); //Promise { '이름은 성민 입니다' }
    console.log(result);
}).
catch((err)=>{
    console.log(err);
})
.finally(()=>{
    console.log()
})


//Promise가 생성될 때는 내부 콜백 함수가 즉시 실행되지만, 비동기 작업 자체는 예약된 후 나중에 실행됩니다.
//비동기를 잘 사용할수 있게 도와주는 객체라고 생각하면 좋을 것 같다.


//resove,reject가 없으면 호출할 수 없음
//아래는 비동기작업이 없어서 바로 실행되는것을 볼 수 있다.
const noAsync = new Promise((resolve,reject)=>{
    resolve("동기프로미스");
    reject("거부")
})

noAsync.then( (result)=>{
    console.log(result);
});
console.log("1")
console.log("2")

/*
출력 순서
1
2
동기프로미스
*/
/*
자바스크립트는 싱글 스레드 언어로, 코드가 실행되는 순서를 이벤트 루프를 통해 관리합니다. 
Promise와 같은 비동기 작업은 마이크로태스크 큐에 들어가며, 이는 현재 실행 중인 모든 동기 코드가 완료된 후에 실행됩니다.
*/

//마이크로테스크에 대해서 나중에 더 알아보자