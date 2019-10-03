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
		gatherNode.say({voice:'Polly.Vitoria'},'Olá, você tem uma dívida de 10 reais, digite 1 para negociar, ou 2 para desconsiderar.');
		
		// If the user doesn't enter input, loop
		twiml.redirect('/');
			

		res.type('text/xml');
		res.send(twiml.toString());
	});	
	
	app.post("/agradecimento", (req, res) => {
		twiml = new VoiceResponse();
		twiml.say({voice:'Polly.Vitoria'},'Negócio fechado ! Agradecemos por sua atenção');
			

		res.type('text/xml');
		res.send(twiml.toString());
	});	
	
	app.post("/modoPag", (req, res) => {
		twiml = new VoiceResponse();
		if (req.body.Digits) {
			switch (req.body.Digits) {
			  case '1': //PAGAMENTO À VISTA
			    gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/gather',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento com boleto digite 1, para pagamento com cartão digite 2');

				twiml.redirect('/gather');
				break;
			  case '2': //PAGAMENTO PARCELADO
			    gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/gather',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento com boleto digite 1, para pagamento com cartão digite 2');

				twiml.redirect('/gather');
				break;
			  default:
				twiml.say({voice:'Polly.Vitoria'},'Desculpe não entendi o que digitou.').pause();
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
	
	app.post("/gather", (req, res) => {
		twiml = new VoiceResponse();
		var gatherNode;
		if (req.body.Digits) {
			switch (req.body.Digits) {
			  case '1': //À VISTA OU PARCELADO?
				gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/modoPag',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento à vista de 8 reais digite 1, para pagamento parcelado em 2 vezes de 5 reais digite 2');

				twiml.redirect('/gather');
				break;
			  case '2': //DESCONSIDERADA
				twiml.say({voice:'Polly.Vitoria'},'Ok, desconsiderada a proposta.');
				break;
			  case '3': //PAGAMENTO À VISTA
			    gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/gather',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento com boleto digite 5, para pagamento com cartão digite 6');

				twiml.redirect('/gather');
				break;
			  case '4': //PAGAMENTO PARCELADO
			    gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/gather',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento com boleto digite 5, para pagamento com cartão digite 6');

				twiml.redirect('/gather');
				break;
			  case '5': //PAGAMENTO(BOLETO)
			    gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/agradecimento',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para receber o boleto no email digite 1, para receber pelos correios digite 2');

				twiml.redirect('/gather');
				break;
		      case '6': //PAGAMENTO(CARTÃO)
			    gatherNode = twiml.gather({ 
					numDigits: 4,
					action: '/agradecimento',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Digite o número do seu cartão');

				twiml.redirect('/gather');
				break;		
			  default:
				twiml.say({voice:'Polly.Vitoria'},'Desculpe não entendi o que digitou.').pause();
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
	