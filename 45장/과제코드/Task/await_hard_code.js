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


async function test(){
	const resolve_0 = await request('a');
	console.log(resolve_0)
	const resolve_1 =  await request('b');
	console.log(resolve_1)
	const resolve_2 =  await request('c');	
	console.log(resolve_2)
	const resolve_3 =  await request('d');
	console.log(resolve_3)
	const resolve_4 = await request('e');
	console.log(resolve_4)
}

test()