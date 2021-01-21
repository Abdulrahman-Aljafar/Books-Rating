const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordDigest: {
    type: String,
    required: true,
  },
  img:String,
  utype : {
    type: String,
    required: true,
  },
  favoriteBooks: Array ,
  //books : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

} , {timestamps :true});



var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;
