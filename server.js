const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
	start: function(texto){
		http
		  .createServer((req, res) => {
			// Create TwiML response
			const twiml = new VoiceResponse();

			twiml.say(texto);

			res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.end(twiml.toString());
		  })
		  .listen(1337, '127.0.0.1');

		return console.log('TwiML server running at http://127.0.0.1:1337/');
	}
}