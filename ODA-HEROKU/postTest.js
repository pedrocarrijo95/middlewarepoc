'use strict'

const axios = require('axios')

var url = "https://testemiddle.herokuapp.com/api/call";
axios.post(url, {
  req: 'Heroku worked'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})