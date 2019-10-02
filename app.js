const accountSid = "ACa7310ffc26e3e8be8ecfa00ef61886ce";
const authToken = "a44f5b298066aaf38e432838102f7c26";

const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
 
const app = express();
 

app.get('/ligar', (request, response) => {
  //TODO - inserir ligarCliente qdo estiver assincrona a funcao gerarVoz para funcionar	
  await gerarVoz('Olá, você tem um dívida de 10 reais. Digite 1 para negociar ou 2 para desconsiderar.', response);
  ligarCliente('https://testemiddle.herokuapp.com/'+response, 'Negociar', 1);

});

app.get('/action/:action/id/:id', (request, response) => {  
  const data = request.params;
  const actionType = data.action;
  const id = data.id;
  
  const callDetails = getDataByActionType(actionType, id);  
  const twiml = new VoiceResponse();
  // Use gather to record user input
  const gather = twiml.gather({
    action: 'https://testemiddle.herokuapp.com/${actionType}/id/${id}',
    input: 'dtmf',
    timeout: 15,
    numDigits: 1,
    method: 'POST'
  });
 
  gather.say(getCallText(callDetails));
 
  twiml.redirect({
    method: 'GET'
  }, 'https://testemiddle.herokuapp.com/${actionType}/id/${id}');
 
 
  response.set('Content-Type', 'text/xml');
  response.send(twiml.toString());
});

app.post('/action/:action/id/:id', (request, response) => {
  const data = request.params;
  const actionType = data.action;
  const id = data.id;
  const digit = request.body.Digits;
  // tratar retorno aqui
  
  gerarVoz('Obrigado pela resposta.', response)

});

//TODO - deixar funcao assincrona
async function gerarVoz(texto, response) {
  // utilizar webhook do ODA para capturar o texto de lá
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'alice' }, texto);
 
  response.type('text/xml');
  response.send(twiml.toString());
}

funcao ligarCliente(url,actionType, id) {
  client.calls.create({
      url: `${actionType}/${actionType}/id/${id}`,
      method: 'GET',
      to: '+123456789',
      from: '+19982412618'
    })
    .then(call => console.log(call.sid))
    .done();
}	

app.listen(3000);