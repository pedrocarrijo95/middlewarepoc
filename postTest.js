'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/teste";
axios.post(url, {
  //message: 'teste teste teste'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})