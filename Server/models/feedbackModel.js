const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  weblink: { type: String },
  textData: { type: String },
  label: { type: String },
  feedbackText: { type: String },
  harmfulUnsafe: { type: Boolean },
  notTrue: { type: Boolean },
  notHelpful: { type: Boolean },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
