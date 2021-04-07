const {createUser} = require ('../services/register.service');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

async function createNewUser (body,res) {
   // let body = req.body;
    let fname =body.FirstName;
    let lname=body.LastName;
    let email=body.Email;
    let password=body.Password;
    let Cpassword=body.PasswordConfirmation;
    //hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    let userBody ={
        "firstname":fname,
        "lastname":lname,
        "email":email,
        "password":hashedPassword
    };
    const user = await createUser(userBody,res);

   // res.status(201).send(user);
  };
  async function signin(req,res){
    const emailExist = await User.findOne({email: req.body.email})
    if(!emailExist){
      res.render("signin",{error:"Email does not exist"});
    }
    const checkpassword = await bcrypt.compare(req.body.password, emailExist.password)
    if(!checkpassword){
      res.render("signin",{error:"Password mismatch"});
    }
    try {
        const token = await jwt.sign({_id: emailExist.id},"process.env.SECRET");
        //res.set('x-access-token', token);
        res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.redirect('/notes');
    } catch (error) {
        res.status(400).send()
    }
  }

  async function logout(req,res){
    cookie = await req.cookies;
        
        res.cookie('jwt', '', {expires: new Date(0)});
    
    res.redirect('/signin');
  }
  async function getCurrentUser(req,res){
    console.log(req.user)
    try {
      const user = await User.findById(req.user._id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  }
  
module.exports ={
    createNewUser,
    signin,
    logout
}