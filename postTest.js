'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/teste teste";
var url2 = "https://testemiddle.herokuapp.com/ligar";
axios.post(url2, {
	//message: 'teste'
})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error('e: '+error)
})

