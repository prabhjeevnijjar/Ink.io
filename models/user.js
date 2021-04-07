//user schema for string user creds while registring

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        rewquired:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileimage:{
        data:Buffer,
        contentType:String
        
    },
    createdAt:{
        type: Date,
        default : Date.now
    } 
});

module.exports=mongoose.model('User',userSchema);