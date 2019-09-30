'use strict'

const axios = require('axios');

var url_setmessage = "https://testemiddle.herokuapp.com/api/setmessage";
var url_call = "https://testemiddle.herokuapp.com/api/call";

axios.post(url_setmessage, {
  'body': 'Heroku funcionou porraaaaaa !!'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})

axios.post(url_call, {
  'body': ''
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})