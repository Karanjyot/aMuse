const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    liked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }

});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;