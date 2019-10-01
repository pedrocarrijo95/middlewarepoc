'use strict'

const axios = require('axios');

var url = "https://testemiddle.herokuapp.com/api/call";
async function makePostRequest() {

    params = {
        id: 6,
        nome: 'Fred',
        last_name: 'Blair',
        email: 'freddyb34@gmail.com'
      }

    let res = await axios.post(url, params);

    console.log(res.data);
}