console.time("측정");

setTimeout(()=>{
},1000)

const promise1 = new Promise((resolve) => {
    console.log("호출1")
    setTimeout(() => {
      resolve(1000)
    }, 1000)
    console.log("호출2")
  })
const promise2 = new Promise((resolve) => {
   setTimeout(() => {
     resolve(4000)
   }, 3000)
 })
 const promise3 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(6000)
    }, 2000)
  })

promise1.then(()=>{
    return promise2;
})
.then( ()=>{
    return promise3;
}).then((e)=>{
    console.log(e);
    console.timeEnd("측정");
});

//위 코드는 3초가 측정된다.
//그런데 promise1.then 이후 promise2를 리턴하고 그 후 promise3를 리턴했는데 왜 3초인가?
//3초->2초 후 총 5초가 걸려야하는게 아닌가?

//이것을 이해하기위해서는 promise가 언제 생성되는지를 잘 봐야한다.
//promise가 생성되면서 안에 있는 내용은 동기적으로 실행한다.
//비동기내용이 생성과 동시에 실행이되었다가 then을 통해 그 값을 불러오기때문에 총 3초의 시간이 걸리는 것 처럼 보이는것이다.
//promise2를 then으로 했을때 promise3은 위에서 실행이 되어있고 2초니까 미리 실행되어져서 바로 then을 통해 resolve()값이 넘어온것이다.

//어떻게보면 병렬로 처리하는 promise.all과 같은 원리인거 같지만 이해하기가 어렵다.
