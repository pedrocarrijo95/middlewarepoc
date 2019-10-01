'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/essa";
axios.get(url, {
	//message: 'teste'
})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error('e')
})