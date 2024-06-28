function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)      
    }, delay)
  })
}


const array = [{word:'SAMSUNG', delay:500}, {word:'SW', delay:490}, {word:'ACADEMY', delay:480}, {word:'FOR', delay:470}, {word:'YOUTH', delay:460}]

async function test(){

	for(const item of array) {
		const resolve = await delay_word(item.word, item.delay)
	
		console.log(resolve)				
	}
}

test()


