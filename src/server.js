const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);
  
    console.dir(request.url);
    console.dir(parsedUrl);
    console.dir(params);
  
    if(urlStruct[parsedUrl.pathname])
    {
      urlStruct[parsedUrl.pathname](request,response,params);
    }
    else{
      urlStruct.notFound(request,response,params);
    }
  };
  
  http.createServer(onRequest).listen(port);