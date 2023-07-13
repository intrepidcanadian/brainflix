import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/component';
import Home from './pages/page';
import VideoUpload  from './pages/videoupload.js' 


const API_KEY = '082e3755-9d57-450b-bc71-ba4741e1a6d4'; 

function App() {
  const [selected, setSelected] = useState(null);

  const handleVideoSelection = (videoId) => {
    setSelected(videoId);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home apiKey={API_KEY} />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/video/:id"
            element={<Home apiKey={API_KEY} selected={selected} setSelected={handleVideoSelection} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
