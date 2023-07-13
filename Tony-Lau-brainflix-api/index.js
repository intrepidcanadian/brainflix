const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());

// GET /videos
app.get('/videos', (req, res) => {
  const data = getDataFromFile();
  res.json(data.videos);
});

// GET /videos/:id
app.get('/videos/:id', (req, res) => {
  const { id } = req.params;
  const data = getDataFromFile();
  const video = data.videos.find((v) => v.id === id);
  if (!video) {
    res.status(404).json({ error: 'Video not found' });
  } else {
    res.json(video);
  }
});

// POST /videos
app.post('/videos', (req, res) => {
  const { title, description } = req.body;
  const data = getDataFromFile();

  const newVideo = {
    id: generateUniqueId(),
    title,
    description,
    thumbnail: '/path/to/thumbnail.jpg', // Replace with your hardcoded thumbnail path
  };

  data.videos.push(newVideo);
  saveDataToFile(data);

  res.status(201).json(newVideo);
});

// Helper function to read data from the JSON file
function getDataFromFile() {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

// Helper function to save data to the JSON file
function saveDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Helper function to generate a unique ID
function generateUniqueId() {
  // Generate a unique ID logic
}

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});