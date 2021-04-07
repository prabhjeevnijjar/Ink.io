const Note = require('../models/note');
const mongoose = require("mongoose");
const jwtDecode =require("jwt-decode");
var multer = require("multer");
var fs = require('fs');
var path = require('path');

// Create and Save a new Note
 create = async(req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
  //uploading image
    
    // var obj = {
        
    //     image: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
    //image upload end here
    let token = await req.cookies;
    let userid = await getUid(token);
    //console.log("userid: ",userid)
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content,
        user: userid,
        // image:obj || "No image"
    });

    // Save Note in the database
    note.save()
    .then(data => {
        
        res.redirect("/notes");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
 findAll = async (req, res) => {
    let token = await req.cookies;
    let userid = await getUid(token);
    Note.find({"user" :userid})
    .then(notes => {
        //havnt mapped data to sendable form !
        console.log(notes);
        res.render("mynotes",{posts:notes});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        console.log(note);
        res.redirect("/notes");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
deletee = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        //res.send({message: "Note deleted successfully!"});
        res.redirect("/notes");
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};

//fn to conver retreived cookie into uid
getUid = async (token)  =>  {

    var decode = await jwtDecode(token.jwt);
    let uid = decode._id;
    var objectId = mongoose.Types.ObjectId(uid);
    return objectId;
}
module.exports ={
    create,
    update,
    deletee,
    findAll,
    findOne
}