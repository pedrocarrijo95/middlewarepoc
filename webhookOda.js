const express = require('express');
const OracleBot = require('@oracle/bots-node-sdk');

const app = express();
OracleBot.init(app);

// implement webhook
const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

const channel = {
    url: 'https://botv2iad1I0025HA8A417bots-mpaasocimt.botmxp.ocp.oraclecloud.com:443/connectors/v1/tenants/idcs-100b89d671b54afca3069fe360e4bad4/listeners/webhook/channels/855b2571-be49-452f-8235-241a3ef23ee7',
    secret: 'eN5quYI3KXX4DMZkim7CY8OozMetEsmO'
};
const webhook = new WebhookClient({ channel: channel });
webhook.on(WebhookEvent.ERROR, console.error); // receive errors

// receive bot messages
app.post('/bot/message', webhook.receiver()); // receive bot messages
webhook.on(WebhookEvent.MESSAGE_RECEIVED, message => {
  // format and send to messaging client...
});

// send messages to bot (example)
app.post('/user/message', (req, res) => {
  let message = req.body.Digits; // format according to MessageModel
  webhook.send(message)
    .then(() => res.send(req.body.Digits), e => res.status(400).end());
});