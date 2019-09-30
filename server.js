const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = {
	start: function(texto){
		//http
		  //.createServer((req, res1) => {
			// Create TwiML response
			const twiml = new VoiceResponse();

			twiml.say(texto);

			//res1.writeHead(200, { 'Content-Type': 'text/xml' });
			//res1.end(twiml.toString());
			
			app.get('/',function(req,res){
				res.writeHead(200, { 'Content-Type': 'text/xml' });
				res.end(twiml.toString());
				//res.send(res1);
			});
	
			
		 // })
		  //.listen(1337, '127.0.0.1');

		return console.log('TwiML server running at http://127.0.0.1:1337/');
	}
}