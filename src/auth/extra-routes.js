const express = require('express');
const router = express.Router();

const bearerAuth = require('../auth/middleware/bearer-auth');
const permissions = require('../auth/middleware/authorize');



router.post('/add', bearerAuth, permissions('add'), (req,res)=>{
  res.status(201).send('created ..');
});

router.get('/read', bearerAuth, permissions('read'),(req,res)=>{
  res.status(201).send('Allowed reading ');
});

router.put('/change', bearerAuth, permissions('change'), (req,res)=>{
  res.status(201).send('changed ..');
});
router.delete('/remove', bearerAuth, permissions('remove'),(req,res)=>{
  res.status(201).send('removed  ..');
});

module.exports=router;