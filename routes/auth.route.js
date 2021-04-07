const router = require("express").Router();
const {createNewUser, signin, logout} = require ('../controllers/auth.controller');
let {userRegistrationValidationRules,validate} = require('../middlewares/validations/validator');
router.get("/registration",(req,res)=>{
    res.render("registration");
});
 router.post("/registration",userRegistrationValidationRules(), validate  ,(req,res)=>{
    createNewUser(req.body,res);
 });
 router.get("/signin",(req,res)=>{
    res.render("signin");
});
 router.post("/signin",(req,res)=>{
    signin(req,res);
 });
 router.get("/logout",(req,res)=>{
    logout(req,res);
 })
module.exports = router;