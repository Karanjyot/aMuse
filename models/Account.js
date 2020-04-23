const mongoose = require("mongoose");
//Marked for deletion
const AccountSchema = new mongoose.Schema({
  artist_nickname: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Song`,
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Image`,
    },
  ],

  library: [
    {
        name: {
            type: String
       },
       downloadURL: {
           type: String,
           required: false
       },
       albumPhoto: {
           type: String, 
           required: false,
       },
       artist: {
           type:String 
       },
       genre:{
           type: String
       },
       comments: [
           {
               type: mongoose.Schema.Types.ObjectId,
               ref: `Comment`
           }
       ],
       likes: [
           {
               type: mongoose.Schema.Types.ObjectId,
               ref: `Like`
           }
       ],
       authorID:{
           type: mongoose.Schema.Types.ObjectId, 
           ref: 'users'  
       },
       accountID:{
           type:mongoose.Schema.Types.ObjectId,
           ref: "Account"
       }
    },
  ],
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
