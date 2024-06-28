const axios = require('axios');

async function request(sub_path){
	const url = 'http://13.124.193.201:8844/' + sub_path
	try{
		const response = await axios.get(url);							
		return response.data
	}
	catch(e){

		console.log(e)
	}
}


const array = ['a','b','c','d','e'];


//awiat를 가변적으로 사용하고 싶다면
//async 함수 안에 for문안에 await를 사용해야한다
//foreach문은 비동기를 순차적으로 실행시키지 않는다
async function test(){
  array.forEach(async (item) => {
	
    const resolve = await request(item);
    console.log(resolve);		
 })
}
test();



