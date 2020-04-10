const mongoose = require('mongoose');
//Marked for deletion
const AccountSchema = new mongoose.Schema({
    artist_nickname: {
        type: String,
        default: ""
    },
    genre:{
        type: String, 
        default: ""
    },
    description:{
        type: String, 
        default: ""
    },
    country: {
        type: String, 
        default: ""
    },
    city: {
        type: String, 
        default: ""
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'  
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Song`
        }   
    ],
    images: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: `Image`
        }
    ]

});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;