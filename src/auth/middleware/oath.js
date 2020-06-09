'use strict';

const users = require('../models/users/users-model');
const superagent = require('superagent');

const CLIENT_ID =  process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const tokenServerUrl = process.env.tokenServerUrl; //to get the token
const remoteUserApi = process.env.remoteUserApi; // to get the user 

const API_SERVER = process.env.API_SERVER;

module.exports = async (req,res,next)=>{
// we made 3 smaller functions to devide the procces
// now I will call the functions 
  try{
    let code = req.query.code; //from the form 
    console.log('codeeee',code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('remoteTokennnnnnn',remoteToken);

    let remoteUser = await getRemoteUser(remoteToken);
    console.log('remoteUserrrrrr',remoteUser);
    let [user,token]=await getUser(remoteUser);
    req.user = user;
    req.token = token;

    next();

  }catch(err){
    console.log('error',err.message);
    next();
  }

};

// 1- login with superagent => get the token 
async function exchangeCodeForToken(code){ //this code will recived from the form 
  let tokenRespone = await superagent
    .post(tokenServerUrl)
    .send({
      //from the docs we get these parameters (Backend)
      client_id : CLIENT_ID,
      client_secret :CLIENT_SECRET,
      redirect_url: API_SERVER ,
      // state : 'abccba' ,//any thing string 
      code : code,
      grant_type : 'authoraization_code',
    });
  //after this I will have access token 
  let access_token = tokenRespone.body.access_token;
  return access_token;
}


// 2- take the token and => return the user 
async function getRemoteUser(token){ // will take the access_token as argument 
  let userResponse = await superagent
    .get(remoteUserApi)
    .set('user-agent', 'express-app')
    .set('Authorization',`token ${token}`);

  let user = userResponse.body;
  return user;
}

// 3- add this user to the DB 
//when we add this user we don't care about the password 
async function getUser(remoteUser){
  let userRecord = {
    username : remoteUser.login, 
    password : 'no-pass',
  };
  
  //now I will generate token from my server 
  let savedUser = await users.save(userRecord);
  let myServerToken = users.generateToken(userRecord);
  return [savedUser,myServerToken];
}