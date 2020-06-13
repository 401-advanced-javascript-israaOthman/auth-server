'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
  username : {type : String , required : true},
  password : { type : String , required : true},
  role : { type : String , required : true , enum : ['admin','user','writer','editor']},
//   fullname  : {type : String , required : true},
//   email : {type : String , required : true},
});

schema.pre('save', async function() {
  this.password  = await bcrypt.hash(this.password, 5);
});

module.exports = mongoose.model('schema', schema);