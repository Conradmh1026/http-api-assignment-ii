
const Users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};


//gets a user
const getUsers = (request, response) => {
  const responseJSON = {
    Users,
  };

  respondJSON(request, response, 200, responseJSON);
};


//add a user
const addUser = (request, response, body) => {
  const responseJSON= {
    message: 'Name and age are both required',
  };
  if(!body.name || !body.age)
  {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if(Users[body.name]){
    responseCode = 204;
  }else{
    Users[body.name] = {};
  }

  Users[body.name].name = body.name;
  Users[body.name].age = body.age;

  if(responseCode === 201){
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response,responseCode);
};



/* 200
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  };

  respondJSON(request, response, 200, responseJSON);
};

// 400
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true',
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

// 404
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};*/

module.exports = {
  getUsers,
  addUser,
};
