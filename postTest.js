'use strict'

const axios = require('axios');

axios.request({
  method: 'POST',
  url: 'https://testemiddle.herokuapp.com/api/call/',
  data: {
    message: 'testando testando testando'
  },

})
.then((res) => {
  ///console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.message)
}, (error) => {
  console.error(error)
})

