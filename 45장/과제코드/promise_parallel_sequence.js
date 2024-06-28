function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)
    }, delay)
  })
}


const array = [{word:'SAMSUNG', delay:500}, {word:'SW', delay:490}, {word:'ACADEMY', delay:480}, {word:'FOR', delay:470}, {word:'YOUTH', delay:460}]

const promise_list = []

array.forEach((item) => {

	const promise = delay_word(item.word, item.delay)

	promise_list.push(promise)
})

Promise.all(promise_list).then((values) => {

	values.forEach((resolve) => {console.log(resolve)})
})

