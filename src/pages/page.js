import React, { useState, useEffect } from 'react';
import '../pages/page.scss';
import viewsIcon from '../assets/images/views.svg';
import likesIcon from '../assets/images/likes.svg';
import avatar from "../assets/images/Mohan-muruge.jpg";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Home = ({videos}) => {


    // i am destructuring here from /video/:id <Route path="/video/:id" from the App.js page
    let { id } = useParams();

    // I put the data array into setVideoDataList. This is the initial array which just has the title, id, image
    const [videoDataList, setVideoDataList] = useState([]);

    // onclick the video id selected will be passed into url
    // For each video object in videoDataList, which is the preliminary video FileList, it looks to see which video id is equal to videoID
    // videoID is equal to below

    // const setCurrentVideo = (videoId) => {

    // };

    // if the clicked one is the same, it passes the selected video into setSelectedVideo.
    // The selectedVideo gets passed into the html

    const [selectedVideo, setSelectedVideo] = useState(null);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // const clickvideo = videoDataList.find((video) => video.id === videoDataList.id);
    // setSelectedVideo(clickvideo);


    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/videos/`);
                let data = await response.data;
                let defaultVideoId = id ? id : data[0].id;

                setVideoDataList(data);
                setSelectedVideo(data.find(video => video.id === defaultVideoId));
                fetchComments(defaultVideoId);

                // const response2 = await axios.get(`http://localhost:8000/videos/${id}`);
                // const data2 = await response2.data
                // setSelectedVideo(data2);
                // fetchComments(defaultVideoId);
    
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, [id]);


    const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/videos/${selectedVideo.id}`);
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

    if (!videoDataList || videoDataList.length === 0 || !selectedVideo) {
        return <div>Loading...</div>;
      }

    const { title, channel, image, description, likes, views, video } = selectedVideo

    

    console.log(selectedVideo)

    return (
        <div>
            <div className="video">
                {selectedVideo ? (
                    <video controls poster={image} className="video__player">
                        <source src={video} type="video/mp4" className="video__player" />
                    </video>
                ) : (
                    <div>Loading video...</div>
                )}
            </div>

            <div className="movie__information">
                <div className="movie__information--words">
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <div className="movie__description">
                         <h2>By: {channel}</h2>
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
                        <h3 className ="movie__verbage--text">{description}</h3>
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
                                >
                                    <div className="movie__list"> 
                                    <Link to={`/video/${videoItem.id}`}
                                        className={`${selectedVideo && selectedVideo.id === videoItem.id ? 'selected ' : ''
                                            } movie__component--carousel`}>
                                        <img className="image__peak" src={videoItem.image} alt={videoItem.title} />
                                        <div>
                                        <p className="movie__list--titles">{videoItem.title}</p>
                                        <p className="movie__list--channel">{videoItem.channel}</p>
                                        </div>    
                                    </Link>
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
