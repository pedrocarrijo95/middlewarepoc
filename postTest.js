'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call";
axios.post(url, {
  'body': 'Heroku funcionou porraaaaaa !!'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})