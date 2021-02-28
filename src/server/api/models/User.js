const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  coinbaseId: String,
  name: String
})

// create a new collection called users
// creates if does not exist, will not overwrite
// Can add and remove properties as we'd like
mongoose.model('users', userSchema);
