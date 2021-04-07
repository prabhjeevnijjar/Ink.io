var path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
var fileupload = require("express-fileupload");
const methodOverride = require('method-override');
require('dotenv').config();
const {authenticateToken} = require('./middlewares/authentication/auth');
const auth = require('./routes/auth.route');
const notes = require('./routes/notes.route');

const app = express();

app.use(methodOverride('_method'));
app.use(fileupload());
app.use(cors());
app.use('/scripts', express.static(__dirname + '/scripts/'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + './views')));
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology:true },(err)=>{
    if(err) {
        console.log(err);
    } else {
    console.log("Connection to MongoDb successful");
    }
});

app.use('/',auth);
app.use('/',authenticateToken,notes);
app.get('/homepage',authenticateToken,(req,res,next)=>{
    res.render("homepage");
});
app.listen(process.env.PORT,()=>{
    console.log("Connected to port",process.env.PORT);
})