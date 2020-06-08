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
app.use(express.static('./public'));
app.use(express.json());
 
app.get('/',(req,res)=>{
  res.send('Working ... :p');
});

app.use(router);


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
