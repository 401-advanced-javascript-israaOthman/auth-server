'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./auth/router');

const notFound = require('./middleware/404');
const serverError = require('./middleware/500');



const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(router);

app.use(express.static('./public'));
 
app.get('/',(req,res)=>{
  res.send('Working ... :p');
});


const oath = require('../src/auth/middleware/oath');

app.get('/oauth', oath , (req,res)=>{
  res.cookie('token', req.token, {
    httpOnly : false,
  });
  // console.log('token',req.token);
  res.status(200).send(req.token);
});



app.use('*', notFound); 
app.use(serverError); 



module.exports = {
  server: app,
  start: (port, mongodb_uri) => {
    app.listen(port, () => {
      console.log('Server is up and running on port', port);
    });
    let options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(mongodb_uri, options);
  },
};
