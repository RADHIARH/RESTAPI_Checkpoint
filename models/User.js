const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  password: String,
});
const modeluser = mongoose.model("customers", UserSchema);
module.exports = modeluser;
