'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call";
axios.request({
  method: 'POST',
  url: https://testemiddle.herokuapp.com/api/call,
  data: {
    message: 'lets add something here'
  },

})
.then((res) => {
  //console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.message)
})
.catch((error) => {
  console.error(error)
})