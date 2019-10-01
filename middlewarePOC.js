var request = require('request');
var express = require('express');
const axios = require('axios')

var app = express();

const accountSid = "AC1458c7907d82d4b0f1f563d046ae2f97";
const authToken = "8d1a3b4cf1b6851f7f96b13fe37da5d3";
const client = require('twilio')(accountSid,authToken);


const VoiceResponse = require('twilio').twiml.VoiceResponse;
const server = require('./server.js');

	/**var texto = "teste teste teste";
	const twiml = new VoiceResponse();
	twiml.say(texto);
	
	app.post('/',function(req,res){
		res.writeHead(200, { 'Content-Type': 'text/xml' });
		res.end(twiml.toString());
	});**/
	
	var texto = 'teste teste teste';
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
		
		
		
		
		
	app.post("/api/call:message", function(req, res) {
		
		const twiml = new VoiceResponse();
		twiml.say(req.params.message);
		
		app.post('/',function(req,res){
			res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.end(twiml.toString());
		});
	
		
		if(req.params.message){
			console.log("entrou");
			client.calls
				  .create({
					url: 'https://testemiddle.herokuapp.com',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982412618',
					from: '+12055761830'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		}
	});
	