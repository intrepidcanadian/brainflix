import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/component';
import Home from './pages/page';
import VideoUpload  from './pages/videoupload.js' 


// no longer needed
// const API_KEY = '082e3755-9d57-450b-bc71-ba4741e1a6d4'; 
const API_URL = 'http://localhost:8000/videos';

function App() {
  const [selected, setSelected] = useState([]);

  // i pass down videos from fetching from own api
  const [videos, setVideos] = useState([]);

  // this is for initial mounting of videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      // i set videos to the data from api
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoSelection = (videoId) => {
    setSelected(videoId);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home videos={videos} />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/video/:id"
            element={<Home videos={videos} selected={selected} setSelected={handleVideoSelection} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
