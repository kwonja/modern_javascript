function delay_word(word, delay) {
  return new Promise(resolve => {
    setTimeout(function (){
      resolve(word)      
    }, delay)
  })
}

console.log(delay_word('SAMSUNG', 500).then( (promise) => {console.log(promise)}).then( ()=> {console.log("프라미스 반환")}))

const array = [{word:'SAMSUNG', delay:500}, {word:'SW', delay:490}, {word:'ACADEMY', delay:480}, {word:'FOR', delay:470}, {word:'YOUTH', delay:460}]

array.reduce((prev, item) => {

	return prev.then(() =>
		delay_word(item.word, item.delay).then( (promise) => {console.log(promise)})
  )

}, Promise.resolve())




