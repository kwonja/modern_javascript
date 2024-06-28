function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)
    }, delay)
  })
}


const array = [{word:'SAMSUNG', delay:500}, {word:'SW', delay:490}, {word:'ACADEMY', delay:480}, {word:'FOR', delay:470}, {word:'YOUTH', delay:460}]


async function test(){
	
	const async_fun_list = []

	for(item of array){	
	
		const async_fun = delay_word(item.word, item.delay)
	
		async_fun_list.push(async_fun)
	}
		
	for(async_fun of async_fun_list){
		
		const resolve = await async_fun
		
		console.log(resolve)
	}		
}

	
test()
