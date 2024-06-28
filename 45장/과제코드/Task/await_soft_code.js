function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)      
    }, delay)
  })
}

const array = ['a','b','c','d','e'];

async function test(){

	for (const item of array) {
    const resolve = await request(item);
    console.log(resolve);
}
}

test()


