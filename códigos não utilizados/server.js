const http = require('http');
var express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

var app = express();

module.exports = {
	start: function(texto){
		const twiml = new VoiceResponse();
		twiml.say(texto);
		
		app.post('/',function(req,res){
			res.writeHead(200, { 'Content-Type': 'text/xml' });
			res.end(twiml.toString());
		});
		return console.log('TwiML server running at heroku');
	}
}