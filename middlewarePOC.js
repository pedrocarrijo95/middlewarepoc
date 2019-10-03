	var request = require('request');
	var express = require('express');
	var bodyParser = require('body-parser');
	const axios = require('axios')

	var app = express();

	const accountSid = "ACa7310ffc26e3e8be8ecfa00ef61886ce";
	const authToken = "a44f5b298066aaf38e432838102f7c26";
	const client = require('twilio')(accountSid,authToken);


	const VoiceResponse = require('twilio').twiml.VoiceResponse;
	const server = require('./server.js');

	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	
	var twiml;
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
		
		
	app.post("/", (req, res) => {
		twiml = new VoiceResponse();
		const gatherNode = twiml.gather({ 
			numDigits: 1,
			action: '/gather',
			method: 'POST',
		});
		gatherNode.say({voice= 'Vitoria'},'Olá, você tem um dívida de 10 reais. Digite 1 para negociar ou 2 para desconsiderar.');
		
		// If the user doesn't enter input, loop
		twiml.redirect('/');
			

		res.type('text/xml');
		res.send(twiml.toString());
	});	
	
	
	app.post("/gather", (req, res) => {
		twiml = new VoiceResponse();

		if (req.body.Digits) {
			switch (req.body.Digits) {
			  case '1':
				twiml.say({voice= 'Vitoria'},'Vamos negociar então, compareça a nossa agência no dia 11 de novembro!');
				break;
			  case '2':
				twiml.say({voice= 'Vitoria'},'Ok, desconsiderada a proposta.');
				break;
			  default:
				twiml.say({voice= 'Vitoria'},'Desculpe não entendi o que digitou.').pause();
				twiml.redirect('/');
				break;
			}
		}else{
			// If no input was sent, redirect to the / route
			twiml.redirect('/');
		}

		res.type('text/xml');
		res.send(twiml.toString());	  
	});
		
	app.get("/api/call/:message", async function(req, res) {

			console.log("entrou");
			client.calls
				  .create({
					url: 'https://testemiddle.herokuapp.com/',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982412618',
					from: '+13343397409'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		
	});
	