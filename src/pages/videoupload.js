import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/videoupload.scss';
import thumbnail from "../assets/images/Upload-video-preview.jpg";


function VideoUpload() {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch('http://localhost:8000/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVideo = {
      title: title,
      description: description,
      channel: "",
      views: "",
      likes: "",
      duration: "",
      video: "",
      timestamp: "",
      comments: []
    };

    fetch('http://localhost:8000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchVideos();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      <div className="upload__section">
        <div className="upload__section--title">
          <h1>Upload Video</h1>
        </div>
        <hr className="horizontal--line"></hr>
        <div className="video-upload-container">
          <div className="thumbnail-section">
            <span>VIDEO THUMBNAIL</span>
            <img src={thumbnail} alt="Video Thumbnail" />
          </div>
          <div className="form-section">

            <form onSubmit={handleSubmit}>
              <label>
                <span>TITLE YOUR VIDEO:</span>
                <input
                  type="text"
                  className="video-title-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title to your video"
                />
              </label>
              <br />
              <label>
                <span>ADD A VIDEO DESCRIPTION</span>
                <textarea
                  className="video-description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description to your video"
                />
              </label>
              <br />
              <div className="button-group">
                <Link to="/" className="cancel-link">CANCEL</Link>
                <button type="submit" className="publish-button">PUBLISH</button>
              </div>
            </form>
          </div>
        </div>
        <hr className="horizontal--line"></hr>
      </div>
    </>
  );
}

export default VideoUpload;
