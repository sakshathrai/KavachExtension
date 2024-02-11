const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  weblink: { type: String, required: true },
  textData: { type: String, required: true },
  label: { type: String, required: true },
  feedbackText: { type: String },
  harmfulUnsafe: { type: Boolean },
  notTrue: { type: Boolean },
  notHelpful: { type: Boolean },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
