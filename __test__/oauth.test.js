'use strict';

const bearer = require('../src/auth/middleware/bearer-auth');

describe('bearer-oauth MiddleWare',()=>{
  let consoleSpy;

  beforeEach(()=> {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(()=> {
    consoleSpy.mockRestore();
  });

  it('no user is loged/signed in ',()=>{
    let req = {headers:{
      authorizaton:'',
    }};
    let res = {};
    let next = jest.fn(); 
    bearer(req,res,next);
    expect(next).toHaveBeenCalled();
  });
  it('succesfull user ',()=>{
    let req = {headers:{
      authorizaton:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvc28iLCJjYXBhYmlsaXR5IjpbInJlYWQiLCJjcmVhdGUiXSwiaWF0IjoxNTkxNzk1OTYzLCJleHAiOjE1OTE3OTY4NjN9.seMQ7Lea9ClUotOfFXNcjTnQZU9xu9jJSTLOgtzqBF8',
    }};
    let res = {};
    let next = jest.fn(); 
    bearer(req,res,next);
    expect(next).toHaveBeenCalled();
  });
});
