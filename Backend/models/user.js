const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['victim', 'advocate', 'judge'] },
  barCouncilId: { type: String, required: function () { return this.role === 'advocate'; } }
});

module.exports = mongoose.model('User', userSchema);
