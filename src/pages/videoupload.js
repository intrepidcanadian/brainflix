import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/videoupload.scss';
import thumbnail from "../assets/images/image4.jpeg";


function VideoUpload() {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic to handle video upload
    // You can make a POST request to your API endpoint here
  };

  return (
    <>

    <h1>Upload Video</h1>
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
    </>
  );
}

export default VideoUpload;
