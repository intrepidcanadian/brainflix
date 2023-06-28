import React, { useState } from 'react';
import Header from './components/Header/Header';
import VideoPlayer from './components/Main/main.js';
import './App.css';
import './styles.css';

import videoDataList from '../src/data/video-details.json'

function App() {
  const [selected, setSelected] = useState(null);

  const handleVideoSelection = (videoId) => {
    setSelected(videoId);
  };

  return (
    <div className="App">
      <Header />
      <VideoPlayer selected={selected} setSelected={handleVideoSelection} videoDataList={videoDataList} />
    </div>
  );
}

export default App;