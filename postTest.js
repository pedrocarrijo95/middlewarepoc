'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/teste teste";
axios.get(url, {
	//message: 'teste'
})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error('e: '+error)
})