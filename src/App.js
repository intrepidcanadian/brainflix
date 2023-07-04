import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home';
import videoupload from './pages/videoupload';
import VideoPlayer from './pages/VideoPlayer';

import videoDataList from '../src/data/video-details.json';

const API_KEY = '082e3755-9d57-450b-bc71-ba4741e1a6d4'; 

function App() {
  const [selected, setSelected] = useState(null);

  const handleVideoSelection = (videoId) => {
    setSelected(videoId);
  };

  return (
    <div className="App">
      <Header />
      {/* <VideoPlayer selected={selected} setSelected={handleVideoSelection} videoDataList={videoDataList} /> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home apiKey={API_KEY} />} 
          />
          <Route path="/upload" element={<videoupload />} />
          <Route
            path="/video/:id"
            element={<VideoPlayer apiKey={API_KEY} selected={selected} setSelected={handleVideoSelection} videoDataList={videoDataList} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
