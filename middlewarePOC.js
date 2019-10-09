	var request = require('request');
	var express = require('express');
	var bodyParser = require('body-parser');
	const axios = require('axios')

	var app = express();

	const accountSid = "ACe681ff9cf06fe1f18daac9232f09f884";
	const authToken = "ee7d65ca02304bfeec42443b504b21de";
	const client = require('twilio')(accountSid,authToken);


	const VoiceResponse = require('twilio').twiml.VoiceResponse;
	//const server = require('./server.js');
	const hook = require('./webhook-Oda.js')(app);
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	
	var twiml;
	app.listen(process.env.PORT || 8080);
	console.log('APP ligado');
			
	app.get('/bot', (req, res) => {
		twiml = new VoiceResponse();
		var texto = '1';
		console.log(texto);
		hook.assistantMessage(texto).then(function (result) {
			//texto = result.messagePayload.text;
			res.send(result.messagePayload.text);
		})
		.catch(function(err) {
		  console.error('Error: ' + err);
		  console.dir(err);
		});
		if(texto == ''){
			texto = 'Olá digite qualquer coisa para continuar';	
		}
		const gatherNode = twiml.gather({ 
			numDigits: 1,
			action: '/user/message', //enviando para o webhook
			method: 'POST',
		});
		gatherNode.say({voice:'Polly.Vitoria'},texto);
		
		// If the user doesn't enter input, loop
		twiml.redirect('/bot/message');	
		
		res.type('text/xml');
		res.send(twiml.toString());
	});	
		
	app.post("/", (req, res) => {
		twiml = new VoiceResponse();
		const gatherNode = twiml.gather({ 
			numDigits: 1,
			action: '/gather', //enviando para o webhook
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
	
/** SEPARANDO AS REQUISIÇÕES DE PERGUNTAS PARA ORGANIZAR MELHOR O CÓDIGO
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
	});	**/
	
	app.post("/gather", (req, res) => {
		twiml = new VoiceResponse();
		var gatherNode;
		if (req.body.Digits) {
			switch (req.body.Digits) {
			  case '1': //À VISTA OU PARCELADO?
				gatherNode = twiml.gather({ 
					numDigits: 1,
					action: '/gather',
					method: 'POST',
				});
				gatherNode.say({voice:'Polly.Vitoria'},'Para pagamento à vista de 8 reais digite 3, para pagamento parcelado em 2 vezes de 5 reais digite 4');

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
					url: 'https://testemiddle.herokuapp.com/bot',//'https://demo.twilio.com/docs/voice.xml',
					to:  '+5519982412618',
					from: '+12015814199'
				}).then(call => console.log(call.sid));
			console.log("terminou");	
			//process.exit(0);
		
	});
	