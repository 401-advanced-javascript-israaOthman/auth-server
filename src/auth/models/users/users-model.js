'use strict';
require('dotenv').config();
const schema = require('./users-schema');
const Model = require('../mongo');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET = process.env.SECRET || 'secret';

let roles = {
  user :  ['read'],
  writer : ['read' ,'add'],
  editor : ['read' ,'add' , 'change'],
  admin :  ['read' ,'add' , 'change' , 'remove'],
};

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
    const token =  jwt.sign({
      username: user.username,
      capabities: roles[user.role],
    }, SECRET);
    // console.log('useeeeeeer',user);
    return token;
  }

  can(permision){
    // console.log('this roleeeeee',this.role);
    if(permision){
      return Promise.resolve(true);
    }
    else{
      return Promise.resolve(false);
    }
  }

  // // this function for thr Bearer 
  // async verifyToken(token){ //here we use the verity method to check if this token is valid 
  //   try {
  //     const obj = await jwt.verify(token,SECRET);
  //     const data = await this.get({username: obj.username});

  //     console.log('dataaaa',data);

  //     if(data.length !== 0){ // if the token is valid we need to check if it is in our DB
  //       return Promise.resolve(data[0]);
  //     }
  //     return Promise.reject();
  //   }
  //   catch(e){
  //     console.log('errrrr', e);
  //     return Promise.reject(e);
  //   }
  // }

  verifyToken(token) {
    const scema = this.schema;
    return jwt.verify(token, SECRET, async function(err, decoded) {
      if (err) {
        return Promise.reject(err);
      }
      const result = await scema.findOne({ username: decoded.username });
      if (result) {
        return Promise.resolve(decoded);
      } 
      return Promise.reject();
    });


  }
}

module.exports = new Users();
