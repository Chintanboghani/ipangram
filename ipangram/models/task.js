const mongoose = require("mongoose");
const { CODEQUALITY } = require('../utils/constants');
const taskSchema = new mongoose.Schema({
  project       : { type :String},
  estimated_time: { type: String },
  final_time    : { type: String},
  status_of_completed: { type: Boolean,default:false },
  comment       : [{comments: {type:String}}],
  replay_comment: [{replay:{type:String},
                    comments_id:{type:mongoose.Schema.ObjectId},
                    user_id:{type:mongoose.Schema.ObjectId}
                  }],
  quations      : { type: String },
  code_quality  : { type: String, enum: [...Object.values(CODEQUALITY)], default: CODEQUALITY.GOOD },
},
{
  timestamps: true,
});
module.exports = mongoose.model('task', taskSchema);