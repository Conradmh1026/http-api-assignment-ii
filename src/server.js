const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./response.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if(parsedUrl.pathname === '/addUser'){
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });
    request.on('data', (chunk) =>{
      body.push(chunk);
    });

    request.on('end', ()=>{
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(request, response, bodyParams);
    });

  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCss(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

/*const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/style': htmlHandler.getCss,
  notFound: jsonHandler.notFound,
};*/

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if(request.method === 'POST')
  {
    handlePost(request, response, parsedUrl);
  }
  else{
    handleGet(request,response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);