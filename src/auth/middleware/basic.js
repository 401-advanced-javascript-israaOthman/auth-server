'use strict';

const users = require('../models/users/users-model');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  let [user, pass] = base64.decode(basic).split(':'); // [user, pass];

  users.authenticateBasic(user, pass)
    .then(validUser => {
      console.log('bbbbbbbbbbbbb',validUser);
      req.token = users.generateToken(validUser);
      req.user = validUser;
      next();
    })
    .catch(err => next('Invalid Login!!'));
};

