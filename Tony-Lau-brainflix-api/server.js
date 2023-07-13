const express = require('express');
const cors = require('cors');
const app = express();
const videos = require('./videos.json');

app.use(cors());
app.use(express.json());

// Get all videos
app.get('/videos', (req, res) => {
  res.json(videos);
});

// Create a new video
app.post('/videos', (req, res) => {
  const newVideo = req.body;
  // Generate a new unique ID for the video
  newVideo.id = generateUniqueId();
  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// Helper function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});