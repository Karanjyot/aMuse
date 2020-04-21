const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String
    },
    datePosted:{
        type: Date,
        default: Date.now()
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'  
    },
    authorName:{
        type: String, 
    },
    authorImage:{
        type: String
    }
});

const Song = mongoose.model('Comment', CommentSchema);

module.exports = Song;