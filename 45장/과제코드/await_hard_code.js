function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)
    }, delay)
  })
}


async function test(){
	
	//console.log(resolve_0)
	const resolve_1 = await delay_word('SW', 600)
	console.log(resolve_1)
	delay_word('SAMSUNG', 800).then(
		(result)=>{console.log(result)}
	)
	const resolve_2 = await delay_word('ACADEMY', 600)	
	console.log(resolve_2)
	const resolve_3 = await delay_word('FOR', 600)
	console.log(resolve_3)
	const resolve_4 = await delay_word('YOUTH', 600)
	console.log(resolve_4)

	console.log(1)
}

test()