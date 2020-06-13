'use strict';

const users = require('../models/users/users-model');

module.exports = (req,res,next)=>{
  if (!req.headers.authorization) {
    next('this user is not logedin');
    return;
  }

  // now we will read the token => Bearer Token / so we need to split it to take the token

  let token = req.headers.authorization.split(' ').pop();
  users.verifyToken(token) //here eather we will receve reject/resolve so we need to deal with both 
    .then(userObject =>{
      // console.log('userObject .....', userObject);
      req.user = userObject;
      next();
    })
    .catch(err => next('protected ... invalid uesr token'));
        
};