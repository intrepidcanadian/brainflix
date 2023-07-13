import React, { useState, useEffect } from 'react';
import '../pages/home.scss';
import viewsIcon from '../assets/images/views.svg';
import likesIcon from '../assets/images/likes.svg';
import avatar from "../assets/images/Mohan-muruge.jpg";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Home = ({ apiKey }) => {
  const [videoDataList, setVideoDataList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`https://project-2-api.herokuapp.com/videos?api_key=${apiKey}`);
        const data = await response.data;
        setVideoDataList(data);

        // if there is no selected id then it is first video

        const defaultVideoId = id ? id : data[0].id;
        setCurrentVideo(defaultVideoId);

      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  useEffect(() => {
    if (selectedVideo) {
      fetchComments(selectedVideo.id);
      setLikes(selectedVideo.likes);
      setViews(selectedVideo.views);
    }
  }, [selectedVideo]);

  const setCurrentVideo = (videoId) => {
    const video = videoDataList.find((video) => video.id === videoId);
    setSelectedVideo(video);
  };

  const fetchComments = async (videoId) => {
    try {
      const response = await axios.get(`https://project-2-api.herokuapp.com/videos/${videoId}?api_key=${apiKey}`);
      const data = response.data;
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = () => {
    if (newComment) {
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        name: "Anonymous",
        comment: newComment,
        likes: 0,
        timestamp: Date.now(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  if (videoDataList.length === 0) {
    return <div>Loading...</div>;
  }

  const { title, channel, image, description, duration, video } = selectedVideo || {};

  return (
    <div>
      <div className="video">
        {selectedVideo && (
          <video controls poster={image} className="video__player">
            <source src={video} type="video/mp4" className="video__player" />
          </video>
        )}
      </div>

      <div className="movie__information">
        <div className="movie__information--words">
          <div>
            <h1>{title}</h1>
          </div>
          <div className="movie__description">
            <div className="movie__stats">
              <img src={viewsIcon} alt="Views" />
              <p className="movie__stats--color">{views}</p>
            </div>
            <div className="movie__stats">
              <img src={likesIcon} alt="Likes" />
              <p className="movie__stats--color">{likes}</p>
            </div>
          </div>
          <div className="movie__verbage">
            <h3>{description}</h3>
          </div>
          <div className="comment__title">
            <h2>Comments</h2>
          </div>
          <div className="comment__title">
            <img src={avatar} className="avatar" alt="Avatar" />
            <div className="commentary__box">
              <h3>Join the Conversation</h3>
              <input
                type="text"
                placeholder="Add a New Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="submission__box">
              <button className="upload__comment" onClick={handleCommentSubmit}>
                COMMENT
              </button>
            </div>
          </div>
          <div className="comment__section">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment--info">
                    <p className="comment--name">{comment.name}</p>
                    <p className="comment--date">{new Date(comment.timestamp).toLocaleDateString()}</p>
                  </div>
                  <p className="comment--text">{comment.comment}</p>
                </div>
              ))
            ) : (
              <div>No comments available.</div>
            )}
          </div>
        </div>

        <div className="movie__component">
          <h3 className="lightHeading">NEXT MOVIES</h3>
          <div>
            <ul className="movie__list">
              {videoDataList.map((videoItem) => (
                <li
                  key={videoItem.id}
                  id={videoItem.id}
                  title={videoItem.title}
                  onClick={() => setCurrentVideo(videoItem.id)}
                  className={`${selectedVideo && selectedVideo.id === videoItem.id ? 'selected ' : ''
                    } movie__component--carousel`}
                >
                  <img className="image__peak" src={videoItem.image} alt={videoItem.title} />
                  <div>
                    <h3 className="movie__list--titles">{videoItem.title}</h3>
                    <h2 className="movie__list--titles">{videoItem.channel}</h2>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
