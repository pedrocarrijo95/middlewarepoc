'use strict'

const axios = require('axios')

var url = "https://testemiddle.herokuapp.com/api/call";
axios.post(url, {
  req: 'Heroku worked'
  axios.cancel();
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
  axios.cancel();
})
.catch((error) => {
  console.error(error)
})