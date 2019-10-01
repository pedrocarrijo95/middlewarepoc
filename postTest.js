'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/test";
axios.get(url, {
	
})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.message)
})
.catch((error) => {
  console.error(error)
})