const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_name   : { type:String,required: true,unique: true},
  timeline       : { type: String},
  user_id        : { type: mongoose.Schema.ObjectId, ref: "user"},
  start_date     : { type: String},
  end_date       : { type: String},
  file           : { type: String},
  members        : { type: Array},
  technology     : { type: Array},
},
{
  timestamps: true,
});
module.exports = mongoose.model('project', projectSchema);