const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema({
  technology_name: { type: String, max: 255 },
  file           : { type: String},
  user_id        : { type: mongoose.Schema.ObjectId, ref: "user"},
  userRole       : { type: String},
  status         : { type: Boolean,default:true}
},
{
  timestamps: true,
});
module.exports = mongoose.model('technology', technologySchema);