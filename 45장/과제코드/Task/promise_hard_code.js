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


request('a').then((resolve) => {

	console.log(resolve)

	request('b').then((resolve) => { 

		console.log(resolve)
		
		request('c').then((resolve) => {
			
			console.log(resolve)

			request('d').then((resolve) => {

				console.log(resolve)

				request('e').then((resolve) => {

					console.log(resolve)
				})
			})
		})
	})
})
