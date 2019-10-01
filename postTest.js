'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call/";
axios.request({
  method: 'POST',
  url: 'https://testemiddle.herokuapp.com/api/call/';
  data: {
    next_swastik: 'lets add something here'
  },

})
.then((res) => {
  ///console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
}, (error) => {
  console.error('e')
});