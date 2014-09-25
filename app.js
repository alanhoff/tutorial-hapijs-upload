var Hapi = require('hapi');

var server = new Hapi.Server(8080);

// Registramos a rota principal
server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: __dirname + '/templates/index.html'
  }
});

// Rota de upload
server.route({
  method: 'POST',
  path: '/upload',
  config: {

    payload: {
      output: 'file', // Vamos receber arquivos
      parse: true, // Fazer o parse dos campos
      allow: 'multipart/form-data', // Só podemos receber forms
      maxBytes: 10000000, // Limite de 10MB,
      uploads: __dirname + '/uploads' // diretório onde guardar os arquivos
    },

    handler: function(request, reply) {

      // Respondemos com os mesmos dados que recebemos do browser
      var data = request.payload;
      reply(data);
    }
  }
});


server.start();
