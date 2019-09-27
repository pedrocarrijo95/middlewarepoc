var request = require('request');

const accountSid = "AC1458c7907d82d4b0f1f563d046ae2f97";
const authToken = "8d1a3b4cf1b6851f7f96b13fe37da5d3";
const client = require('twilio')(accountSid,authToken);

const server = require('./server.js');
	
	var fala = "Thanks for calling!";	
	
	server.start(fala);
	//console.log("teste");
	//var doc = parse.parseFromString(fala,"text/xml");
	//console.log("entrou");
	if(fala){
		console.log("entrou");
		client.calls
			  .create({
				url: 'http://127.0.0.1:1337/',//'http://demo.twilio.com/docs/voice.xml',
				to:  '+5519982412618',
				from: '+12055761830'
			}).then(call => console.log(call.sid));
		console.log("terminou");	
	}
	