'use strict'

const axios = require('axios');

axios.request({
  method: 'GET',
  url: 'https://testemiddle.herokuapp.com/api/call/testando teste',
  data: {
    //message: 'testando testando testando'
  },

})
.then((res) => {
  ///console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.message)
}, (error) => {
  console.error(error.response)
})

