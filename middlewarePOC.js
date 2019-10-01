var request = require('request');
var express = require('express');
const axios = require('axios')

var app = express();

const accountSid = "ACa7310ffc26e3e8be8ecfa00ef61886ce";
const authToken = "a44f5b298066aaf38e432838102f7c26";
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
		
		
	app.post("/api/call/", function(req, res) {
		
		//res.send(req.params.message);
		var t = 't';
		const twiml = new VoiceResponse();
		twiml.say(t);
		
		app.post('/',function(req,res){
			res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.end(twiml.toString());
		});
	
		
		if(t){
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
	