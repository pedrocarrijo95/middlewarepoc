'use strict';
//JS NÃO UTILIZADO, SÓ GUARDADO PARA FUTURO COMPONENTE ODA COM HEROKU
const axios = require('axios')
module.exports = {
  metadata: () => ({
    name: 'odaHeroku',
    properties: {
      texto: { required: true, type: 'string' },
    },
    supportedActions: []
  }),
  invoke: (conversation, done) => {
    var texto_ = conversation.properties().texto;
	
	if (texto_) {  
		var url = "https://testemiddle.herokuapp.com/api/call/"+texto_;
		axios.get(url, {
		  //message: texto_
		})
		.then((res) => {
		  //console.log(`statusCode: ${res.statusCode}`)
		  console.log(res)
		})
		.catch((error) => {
		  console.error(error)
		})
		//done();
		
   }
  }
};
	   