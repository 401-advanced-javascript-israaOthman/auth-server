'use strict';
require('dotenv').config();
const schema = require('./users-schema');
const Model = require('../mongo');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET = process.env.SECRET || 'secret';
const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE || 60 ;


class Users extends Model {
  constructor(){
    super(schema);
  }

  async save(record){
    let data = await this.get({username: record.username});
    if (!data[record.username]) {
    //   record.password  = await bcryptjs.hash(record.password, 5);
      return this.create(record);
    }
    return Promise.reject('this user is already signUp');
  }

  async authenticateBasic(username, password){
    let data = await this.get({username : username});

    let valid = await bcryptjs.compare(password, data[0].password);
    return valid ? data[0] : Promise.reject();
  }
  
  generateToken(user){
    // console.log('useeer',user);
    // let options = {expiresIn:TOKEN_EXPIRE};
    // if(!!TOKEN_EXPIRE){
    //   options= {expiresIn:TOKEN_EXPIRE};
    // }
    let tokenn = {id: user._id };
    const token =  jwt.sign(tokenn, SECRET);
    return token;
  }

  //this function for thr Bearer 
  async verifyToken(token){ //here we use the verity method to check if this token is valid 
    try {
      const obj = await jwt.verify(token,SECRET);
      const data = await this.get({id: obj._id});

      // console.log('dataaaa',data.schema);

      if(data.length !== 0){ // if the token is valid we need to check if it is in our DB
        return Promise.resolve(data[0]);
      }
      return Promise.reject();
    }
    catch(e){
      // console.log('errrrr', e);
      return Promise.reject(e);
    }
  }
}

module.exports = new Users();
