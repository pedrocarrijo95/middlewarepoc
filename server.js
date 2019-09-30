const http = require('http');
var express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

var app = express();

module.exports = {
	start: function(texto){
	
	app.get('/voice',(request,response) => {
		const twiml = new VoiceResponse();
		twiml.say({voice: 'alice'}, texto);
		
		response.type('text/xml');
		response.send(twiml.toString());	
		
	});
	
	app.listen(3000, () => {
		console.log("Listening on port 3000");	
	});
		/**http
		  .createServer((req, res1) => {
			// Create TwiML response
			const twiml = new VoiceResponse();

			twiml.say(texto);

			res1.writeHead(200, { 'Content-Type': 'text/xml' });
			res1.end(twiml.toString());
			
	
	
			
		  })
		  .listen(1337, '127.0.0.1');
	
		return console.log('TwiML server running at http://127.0.0.1:1337/');**/
	}
}