function getUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const user = { id: userId, name: 'GYMCODING'};
          // callback(user)
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }, 1000)
    });
  }
  function getPosts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const posts = [
          {id: 1, title: 'Post 1'},
          {id: 2, title: 'Post 2'},
        ]
        resolve(posts)
      }, 1000);
    })
  }
  
  function getComments(postId, callback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const comments = [
          {id: 1, text: 'Comment 1'},
          {id: 2, text: 'Comment 2'},
          {id: 3, text: 'Comment 3'}
        ]
        resolve(comments)
      }, 1000)
    })
  }

  //async는 비동기함수를 의미하고
  //await는 async함수 내부에서 비동기함수의 결과를 기다린다.
 //try-catch-finally 로 에러처리가 가능하다

 async function runAsyncAwait() {
    try {
      const user = await getUser(1);
      const posts = await getPosts(user.id);
      const comments = await getComments(posts[0].id);
      console.log('user: ', user)
      console.log('posts: ', posts)
      console.log('comments: ', comments)
      return user;
    } catch (error) {
      console.log('error: ', error)
    }
  }
  
  // runPromise();
  console.log('start')
  //async로 선언된 함수의 return값은 프로미스이다.
  console.log(runAsyncAwait()); //Promise { <pending> }
  runAsyncAwait().then(user => console.log('user: ', user))
  console.log('end')

  //3개의 비동기가 순차적으로 호출이 되지 않아도 된다면 순차적으로 호출할 필요가없다
  //Promise.all()로 성능개선이 가능