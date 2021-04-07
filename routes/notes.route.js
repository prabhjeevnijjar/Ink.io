const router = require("express").Router();
const { findAll,create, update, deletee } = require("../controllers/notes.controller");

//Create note for loged in user
router.post('/notes', async (req,res)=>{
   create(req,res);
});
//Retreive notes of logged in user
router.get('/notes', async (req,res)=>{
    findAll(req,res);
 });

// Retrieve a single Note with noteId
router.get('/notes/:noteId',  async (req,res)=>{
    findOne(req,res);
 });

// Update a Note with noteId
router.put('/notes/:noteId', async (req,res)=>{
    update(req,res);
 });

// Delete a Note with noteId
router.delete('/notes/:noteId',async (req,res)=>{
    deletee(req,res);
 });

 module.exports=router;
 