const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
    song: {
         type: String
    },
 
});

const Library = mongoose.model('Library', LibrarySchema);

module.exports = Library;