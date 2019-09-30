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
    let texto_ = conversation.properties().texto;
	
	if (texto_) {  
		var url = "https://testemiddle.herokuapp.com/api/call";
		axios.post(url, {
		  req: texto_
		})
		.then((res) => {
		  console.log(`statusCode: ${res.statusCode}`)
		  console.log(res)
		})
		.catch((error) => {
		  console.error(error)
		})
		done();
		
   }
  }
};
	   