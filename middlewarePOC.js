var request = require('request');
var express = require('express');
var sys = require('sys')
var exec = require('child_process').exec;

var app = express();

const accountSid = "AC1458c7907d82d4b0f1f563d046ae2f97";
const authToken = "8d1a3b4cf1b6851f7f96b13fe37da5d3";
const client = require('twilio')(accountSid,authToken);



const server = require('./server.js');

	var req = 'rr';
	server.start(req);
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
	

	//app.post("/api/call", function(req, res) {
		
		if(req){
			console.log("entrou");
			client.calls
				  .create({
					url: 'https://testemiddle.herokuapp.com:1337',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982412618',
					from: '+12055761830'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		}
	//});
	