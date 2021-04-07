const User = require('../models/user');
const jwt = require("jsonwebtoken");

async function createUser(userBody,res) {
   const emailExist =  await User.findOne({"email":userBody.email});
        if(emailExist){
       
            res.render('registration',{emailerror: 'Email already exists'});
        } else {
            const user =  new User(userBody);
                const userSignup = await user.save()
                .then(usr => {
                  console.log(usr);
                  res.render('signin',{message: 'You have Successfuly Registerd'});
                  
              }).catch(err => {
                res.status(400).json({'error':err})
              });  
        }
}
    
    
  

  module.exports={
      createUser
  }