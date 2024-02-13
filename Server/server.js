require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Feedback = require('./models/feedbackModel');

const app = express();
const port = process.env.PORT||3000;
mongoose
  .connect(process.env.MONGO_URL, )
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database error:", err));

app.use(cors());
app.use(bodyParser.json());
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.json({ success: true, message: 'Feedback stored successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
