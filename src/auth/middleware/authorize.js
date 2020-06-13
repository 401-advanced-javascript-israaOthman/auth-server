'use strict';

const users =require('../models/users/users-model');

module.exports = (capability) =>{
  return (req,res,next)=>{
    // here I will chech if the req.user.capabities includes this capabities ..(read/create/update/delete )
    return users.can(req.user.capabities.includes(capability))
      .then(data =>{
        if(data){
          next();
        }else{
          next('you don\'t have access to this rout');
        }
      }).catch(e => {
        next('Invalid login');
      });
                   
  };
};