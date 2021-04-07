const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image:{
    data:Buffer,
    contentType:String
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  pinned:{
    type: Boolean,
    default: false
  },
  user : {
    type: Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Note', NoteSchema)