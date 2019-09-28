'use strict';

var request = require('request');

module.exports = {
  metadata: () => ({
    name: 'odaHeroku',
    properties: {
      texto: { required: true, type: 'string' },
    },
    supportedActions: []
  }),
  invoke: (conversation, done) => {
    let texto = conversation.properties().texto;
	
	if (texto) {
	  const options = {
           url: 'https://apex.oracle.com/pls/apex/pcarrijoapex/hr/AR/',
           method: 'PUT',
           headers: {
			'TEXTO' : texto
		   }	
      };

     /** request(options, function (err, res, body) {
		   if (res.statusCode == 200) {
			   conversation.reply({text: "Entendido! Aponte o seu celular para a imagem que esta ao seu lado."});
			   conversation.transition();
			   done();
		   } else {
			   conversation.reply({text: "Infelizmente algo de errado ocorreu. Tente novamente, por favor."});
			   conversation.keepTurn(true);
			   conversation.transition('intent');
			   done();
		   }		
       });
	} else {
		conversation.reply({text: "[Erro] Todos os parâmetros são requeridos. Tente novamente, por favor."});
		conversation.keepTurn(true);
		conversation.transition('intent');
		done();
	}	**/	
  }
};
	   