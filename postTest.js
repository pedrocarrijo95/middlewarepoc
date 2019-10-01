'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/testando teste";
axios.get(url, {
  //'body': '{message: 'teste'}';
 // message: 'teste teste teste'
})
.then((res) => {
  ///console.log(`statusCode: ${res.statusCode}`)
  console.log(res.data.message)
}, (error) => {
  console.error(error);
})

/**axios.request({
  method: 'POST',
  url: 'https://testemiddle.herokuapp.com/api/call/',
  data: {
    message: 'testando testando testando'
  },

})**/