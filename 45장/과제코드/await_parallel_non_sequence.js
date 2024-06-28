function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)
    }, delay)
  })
}


const array = [{word:'SAMSUNG', delay:500}, {word:'SW', delay:490}, {word:'ACADEMY', delay:480}, {word:'FOR', delay:470}, {word:'YOUTH', delay:460}]


//forEach문은 순서대로 처리되지않음
// let of 문법을 사용해야함
array.forEach(async (item) => {
	
	const resolve = await delay_word(item.word, item.delay)
	
	console.log(resolve)
	
})
