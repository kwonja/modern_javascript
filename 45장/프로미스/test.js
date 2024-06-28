const promise1 = Promise.resolve( () => {
    console.log("호출1")
    setTimeout(() => {
      resolve(1000)
    }, 1000)
    console.log("호출2")
  })
  
  promise1.then((e) => {e();console.log("Test")})
  //이 경우 함수가 resolve의 대상이 되고 then을 통해 인수로 들어간다
  //그렇기때문에 console.log()는 함수가 실행이 되고 출력이된다.
  //해당 resolve의 경우 일반함수에서 사용되기때문에 정의되어 있지 않고, resolve is not defined 에러를 띄게된다.
  //resolve값은 then이 호출될때 실행