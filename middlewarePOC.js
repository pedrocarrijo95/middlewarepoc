var request = require('request');
var express = require('express');

var app = express();

const accountSid = "AC1458c7907d82d4b0f1f563d046ae2f97";
const authToken = "8d1a3b4cf1b6851f7f96b13fe37da5d3";
const client = require('twilio')(accountSid,authToken);


const VoiceResponse = require('twilio').twiml.VoiceResponse;
const server = require('./server.js');

	var texto = "teste teste teste";
	//var req1 = server.start(fala);
	const twiml = new VoiceResponse();
	twiml.say(texto);
	var res1;
	app.get('/',function(req,res){
		res.writeHead(200, { 'Content-Type': 'text/xml' });
		res.end(twiml.toString());
		//res.send(res1);
	});
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
	

	app.post("/api/call", function(req, res) {
		if(texto){
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
	