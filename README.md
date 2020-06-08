# auth-server


## Author: Israa Othman 

## Links and Resourcs 
  -  [lab-11 PR](https://github.com/401-advanced-javascript-israaOthman/auth-server/pull/1)  




  ## Setup 
   - `.env` requirment 
     - PORT - 3000
     - MONGODB_URI='mongodb://localhost:27017/oauth'
     - SECRET='secret-oauth'

  #### How to initialize/run your application  
  using postman or swagger  
- get all users : GET - http://localhost:3000/users
-  signup : POST -  http://localhost:3000/signup/
    + body = {username : 'some name' , password : 'pass'}
-  signin : POST -  http://localhost:3000/signup/
    + Authoraization --> enter the username and the paeeword 
   

  # UML 
   ![uml](./assets/oauthUML.PNG) 
