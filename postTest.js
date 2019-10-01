'use strict'

var request = require('request');
const axios = require('axios');

var fala = 'texto';
var url = "https://testemiddle.herokuapp.com/api/call/";
    var clientServerOptions = {
        uri: 'http://'+clientHost+''+clientContext,
        body: JSON.stringify(fala),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        return;
    });