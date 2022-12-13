const mongoose = require("mongoose");
const { USERROLE } = require('../utils/constants');
const userSchema = new mongoose.Schema({
  user_name     : { type: String, max: 255 },
  first_name    : { type: String, max: 255 },
  last_name     : { type: String, max: 255 },
  email         : { type: String, required: true, max: 255 },
  password      : { type: String, required: true, max: 1024 },
  confirm_password: { type: String,max: 1024 },
  userRole      : { type: String, enum: [...Object.values(USERROLE)], default: USERROLE.EMPLOYEE },
},
{
  timestamps: true,
});
module.exports = mongoose.model('user', userSchema);