const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    liked: {
        type: String,
        unique: true
    }

});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;