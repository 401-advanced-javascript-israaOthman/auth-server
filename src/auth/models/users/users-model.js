'use strict';
require('dotenv').config();
const schema = require('./users-schema');
const Model = require('../mongo');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET = process.env.SECRET || 'secret';


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
    const token =  jwt.sign({username: user.username}, SECRET);
    return token;
  }
}
module.exports = new Users();
