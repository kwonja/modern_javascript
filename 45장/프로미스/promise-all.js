/**
 * 3] Promise.all()
 */

 const promise1 = Promise.resolve(1000);
 const promise2 = new Promise((resolve) => {
   setTimeout(() => {
     resolve(3000)
   }, 3000)
 })
 const promise3 = fetch('https://jsonplaceholder.typicode.com/todos?_limit=5&_delay=2000')
 .then(response => response.json())
  const promise4 = Promise.reject('Fail!')

  // 비동기를 병렬로 처리하고싶을때
  // reject가 발생할 경우 해당 내용만 전달한다.
 Promise.all([promise1, promise2, promise3,promise4])
   .then(console.log)
   .catch(console.error) //거부가 생기면 reject 상태로 넘어옴

   // 비동기를 병렬로 처리하는건 똑같다.
   // 차이점은 이행,거부 모든 상태가 끝날때까지 기다린다.
Promise.allSettled([promise1, promise2, promise3, promise4])
  .then(console.log)

/* 
[
  { status: 'fulfilled', value: 1000 },       
  { status: 'fulfilled', value: 3000 },       
  {
    status: 'fulfilled',
    value: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  { status: 'rejected', reason: 'Fail!' }     
]
*/
//모든 상태를 가지고 있는데,
// fulfill -> value
// reject -> reason