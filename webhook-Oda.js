const OracleBot = require('@oracle/bots-node-sdk');
const { WebhookClient, WebhookEvent } = OracleBot.Middleware;
const middleware = require('./middlewarePOC.js');
var express = require('express');
var bodyParser = require('body-parser');
module.exports = (app) => {

  const logger = console;
  OracleBot.init(app, {
    logger,
  });

  const webhook = new WebhookClient({
    channel: {
      url: 'https://botv2iad1I0025HA8A417bots-mpaasocimt.botmxp.ocp.oraclecloud.com:443/connectors/v1/tenants/idcs-100b89d671b54afca3069fe360e4bad4/listeners/webhook/channels/855b2571-be49-452f-8235-241a3ef23ee7',
      secret: 'eN5quYI3KXX4DMZkim7CY8OozMetEsmO'
    }
  });
  
  webhook
    .on(WebhookEvent.ERROR, err => logger.error('Error:', err.message))
    .on(WebhookEvent.MESSAGE_SENT, message => logger.info('Message to bot:', message))
    .on(WebhookEvent.MESSAGE_RECEIVED, message => {
      console.log('Message from bot:', message);
    });

  function assistantMessage(request) {
    return new Promise(function (resolve, reject) {
      try {	
        const MessageModel = webhook.MessageModel();
        const message = {
	      userId: 'twilio', 
	      messagePayload: MessageModel.textConversationMessage(request)
        };
        webhook.send(message);
        webhook.on(WebhookEvent.MESSAGE_RECEIVED, message => {
	      resolve(message);
        });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    })
  }

  
  app.use(bodyParser.urlencoded({
	extended: true
  }));
  app.use(bodyParser.json());
  
  app.post('/bot/message', webhook.receiver());

  var twiml;
  app.post('/user/message', (req, res) => {
	//var	texto1 = req.body.Digits;
	res.send(req.params.Digits);
	/**assistantMessage(texto1).then(function (result) {
	  twiml = new middleware.VoiceResponse();
	  var texto = result.messagePayload.text.toString();
	  //res.send(result.messagePayload.text);
	  
	  const gatherNode = middleware.twiml.gather({ 
			numDigits: 1,
			action: '/user/message', //enviando para o webhook
			method: 'POST',
		});
		gatherNode.say({voice:'Polly.Vitoria'},texto);
		
		res.type('text/xml');
		res.send(middleware.twiml.toString());
    })
	.catch(function(err) {
	  console.error('Error: ' + err);
	  //console.dir(err);
	});**/
  });

}