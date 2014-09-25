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

      // Salvamos o arquivo novo usando o nome como o email.
      var data = request.payload;
      var mime = require('mime');

      ext = mime.extension(data.file.headers['content-type']);
    
      filename = data.email+'.'+ext;
    
      fs.rename(data.file.path, __dirname + '/../upload/'+filename, function(){
    	  //destruimos o arquivo temporario
        fs.unlink(data.file.path);
    	  res({statusCode: 200, error: null, message: "Upload Complete"});
      });
    }
  }
});


server.start();
