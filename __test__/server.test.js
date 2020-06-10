'use strict';

const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('testing the server',()=>{

  it('should respond 404 of an invalid route',() => {

    return mockRequest
      .get('/anything')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });

  it('should respond properly /', ()=> {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /users', ()=> {
    return mockRequest
      .get('/users')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('POST  /signup ', async() => {
    let test = { 'username': 'israa', 'password': '1234' };
    mockRequest
      .post('/signup')
      .send(test)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('POST  /signup 500', async() => {
    let test = { 'username': 'israa'};
    mockRequest
      .post('/signup')
      .send(test)
      .then(data => {
        expect(data.status).toBe(403);
      });
  });


});

