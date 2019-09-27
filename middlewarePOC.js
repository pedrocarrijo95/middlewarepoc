var request = require('request');
var DomParser = require('dom-parser');

const accountSid = "AC592088cfe1dcd54a477b2a46cc0dc1ab";
const authToken = "6b8cf91894e91360e3f46af4443aeadb";
const client = require('twilio')(accountSid,authToken);

var parse = new DomParser();
	
	var fala = "<?xml version='1.0' encoding='UTF-8'?><Response><Say>Thanks for calling!</Say></Response>";	
	//console.log("teste");
	var doc = parse.parseFromString(fala,"text/xml");
	//console.log("entrou");
	if(fala){
		console.log("entrou");
		client.calls
			  .create({
				url: 'http://demo.twilio.com/docs/voice.xml',
				to: '+5519982412618',
				from: '+12055761830'
			}).then(call => console.log(call.sid));
		console.log("terminou");	
	}
	