var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, required: true, default: false },
  admin: { type: Boolean, required: true, default: false },
});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

//Export model
module.exports = mongoose.model("User", UserSchema);
