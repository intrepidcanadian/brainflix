// import React, { useState, useEffect } from 'react';
// import './home.scss';
// import viewsIcon from '../assets/images/views.svg';
// import likesIcon from '../assets/images/likes.svg';
// import avatar from "../assets/images/Mohan-muruge.jpg";

// const Home = ({ apiKey }) => {
//   const [videoDataList, setVideoDataList] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     const fetchVideoData = async () => {
//       try {
//         const response = await fetch(`https://project-2-api.herokuapp.com/videos?api_key=${apiKey}`);
//         const data = await response.json();
//         setVideoDataList(data);
//         if (selectedVideo) {
//           const selected = data.find((video) => video.id === selectedVideo.id);
//           if (selected) {
//             setSelectedVideo(selected);
//             setComments(selected.comments);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching video data:', error);
//       }
//     };

//     fetchVideoData();
//   }, [apiKey]);

//   useEffect(() => {
//     if (!selectedVideo && videoDataList.length > 0) {
//       setSelectedVideo(videoDataList[0]);
//     } else if (selectedVideo && videoDataList.length > 0) {
//       const selected = videoDataList.find((video) => video.id === selectedVideo.id);
//       if (selected) {
//         setSelectedVideo(selected);
//         setComments(selected.comments);
//       }
//     }
//   }, [selectedVideo, videoDataList]);

//   const handleCommentSubmit = () => {
//     if (newComment) {
//       const comment = {
//         id: Math.random().toString(36).substr(2, 9),
//         name: "Anonymous",
//         comment: newComment,
//         likes: 0,
//         timestamp: Date.now(),
//       };
//       setComments([...comments, comment]);
//       setNewComment("");
//     }
//   };

//   if (videoDataList.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="video">
//         {selectedVideo && (
//           <video controls poster={selectedVideo.image} className="video__player">
//             <source src={selectedVideo.video} type="video/mp4" className="video__player" />
//           </video>
//         )}
//       </div>

//       {selectedVideo ? (
//         <div className="movie__information">
//           <div className="movie__information--words">
//             <div>
//               <h1>{selectedVideo.title}</h1>
//             </div>
//             <div className="movie__description">
//               <h2 className="channel__style">By: {selectedVideo.channel}</h2>
//               <div className="movie__stats">
//                 <img src={viewsIcon} alt="Views" />
//                 <p className="movie__stats--color">{selectedVideo.views}</p>
//               </div>
//               <div className="movie__stats">
//                 <img src={likesIcon} alt="Likes" />
//                 <p className="movie__stats--color">{selectedVideo.likes}</p>
//               </div>
//             </div>
//             <div className="movie__verbage">
//               <h3>{selectedVideo.description}</h3>
//             </div>
//             <div className="comments__section">
//               <h3>{comments.length} Comments</h3>
//               <div className="comments__form">
//                 <textarea
//                   placeholder="Write comment here"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   className="comments__textarea"
//                 />
//                 <button onClick={handleCommentSubmit} className="comments__button">
//                   Comment
//                 </button>
//               </div>
//             </div>
//             {comments && Array.isArray(comments) && comments.length > 0 && (
//               <div className="comments__list">
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="comment">
//                     <div className="comment__avatar">
//                       <img src={avatar} alt="Avatar" />
//                     </div>
//                     <div className="comment__details">
//                       <div className="comment__author">{comment.name}</div>
//                       <div className="comment__text">{comment.comment}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>No video selected</div>
//       )}
//     </div>
//   );
// };

// export default Home;





// import React, { useState, useEffect } from 'react';
// import './home.scss';
// import viewsIcon from '../assets/images/views.svg';
// import likesIcon from '../assets/images/likes.svg';
// import avatar from "../assets/images/Mohan-muruge.jpg";

// const Home = ({ apiKey }) => {
//   const [videoDataList, setVideoDataList] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [likes, setLikes] = useState(0);
//   const [views, setViews] = useState(0);

//   useEffect(() => {
//     const fetchVideoData = async () => {
//       try {
//         const response = await fetch(`https://project-2-api.herokuapp.com/videos?api_key=${apiKey}`);
//         const data = await response.json();
//         setVideoDataList(data);
//         if (selectedVideo) {
//           const selected = data.find((video) => video.id === selectedVideo.id);
//           if (selected) {
//             setSelectedVideo(selected);
//             setComments(selected.comments);
//             setLikes(selected.likes);
//             setViews(selected.views);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching video data:', error);
//       }
//     };

//     fetchVideoData();
//   }, [apiKey]);

//   useEffect(() => {
//     if (!selectedVideo && videoDataList.length > 0) {
//       setSelectedVideo(videoDataList[0]);
//     } else if (selectedVideo && videoDataList.length > 0) {
//       const selected = videoDataList.find((video) => video.id === selectedVideo.id);
//       if (selected) {
//         setSelectedVideo(selected);
//         fetchComments(selected.id); // Fetch comments for the selected video
//         setLikes(selected.likes);
//         setViews(selected.views);
//       }
//     }
//   }, [selectedVideo, videoDataList]);

//   const fetchComments = async (videoId) => {
//     try {
//       const response = await fetch(`https://project-2-api.herokuapp.com/videos/${videoId}?api_key=${apiKey}`);
//       const data = await response.json();
//       setComments(data.comments);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const handleCommentSubmit = () => {
//     if (newComment) {
//       const comment = {
//         id: Math.random().toString(36).substr(2, 9),
//         name: "Anonymous",
//         comment: newComment,
//         likes: 0,
//         timestamp: Date.now(),
//       };
//       setComments([...comments, comment]);
//       setNewComment("");
//     }
//   };

//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   if (videoDataList.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const { title, channel, image, description, duration, video } = selectedVideo || {};

//   return (
//     <div>
//       <div className="video">
//         {selectedVideo && (
//           <video controls poster={image} className="video__player">
//             <source src={video} type="video/mp4" className="video__player" />
//           </video>
//         )}
//       </div>

//       <div className="movie__information">
//         <div className="movie__information--words">
//           <div>
//             <h1>{title}</h1>
//           </div>
//           <div className="movie__description">
//             <div className="movie__stats">
//               <img src={viewsIcon} alt="Views" />
//               <p className="movie__stats--color">{views}</p>
//             </div>
//             <div className="movie__stats">
//               <img src={likesIcon} alt="Likes" />
//               <p className="movie__stats--color">{likes}</p>
//             </div>
//           </div>
//           <div className="movie__verbage">
//             <h3>{description}</h3>
//           </div>
//           <div className="comment__title">
//             <h2>Comments</h2>
//           </div>
//           <div className="comment__title">
//             <img src={avatar} className="avatar" alt="Avatar" />
//             <div className="commentary__box">
//               <h3>Join the Conversation</h3>
//               <input
//                 type="text"
//                 placeholder="Add a New Comment"
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />
//             </div>
//             <div className="submission__box">
//               <button className="upload__comment" onClick={handleCommentSubmit}>
//                 COMMENT
//               </button>
//             </div>
//           </div>
//           <div className="comment__section">
//             {comments && comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div className="comment" key={comment.id}>
//                   <div className="comment--info">
//                     <p className="comment--name">{comment.name}</p>
//                     <p className="comment--date">{new Date(comment.timestamp).toLocaleDateString()}</p>
//                   </div>
//                   <p className="comment--text">{comment.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <div>No comments available.</div>
//             )}
//           </div>
//         </div>

//         <div className="movie__component">
//           <h3 className="lightHeading">NEXT MOVIES</h3>
//           <div>
//             <ul className="movie__list">
//               {videoDataList.map((videoItem) => (
//                 <li
//                   key={videoItem.id}
//                   id={videoItem.id}
//                   title={videoItem.title}
//                   onClick={() => setSelectedVideo(videoItem)}
//                   className={`${selectedVideo && selectedVideo.id === videoItem.id ? 'selected ' : ''
//                     } movie__component--carousel`}
//                 >
//                   <img className="image__peak" src={videoItem.image} alt={videoItem.title} />
//                   <div>
//                     <h3 className="movie__list--titles">{videoItem.title}</h3>
//                     <h2 className="movie__list--titles">{videoItem.channel}</h2>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import './home.scss';
import viewsIcon from '../assets/images/views.svg';
import likesIcon from '../assets/images/likes.svg';
import avatar from "../assets/images/Mohan-muruge.jpg";

const Home = ({ apiKey }) => {
  const [videoDataList, setVideoDataList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`https://project-2-api.herokuapp.com/videos?api_key=${apiKey}`);
        const data = await response.json();
        setVideoDataList(data);
        if (selectedVideo) {
          const selected = data.find((video) => video.id === selectedVideo.id);
          if (selected) {
            setSelectedVideo(selected);
            setComments(selected.comments);
            setLikes(selected.likes);
            setViews(selected.views);
          }
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [apiKey]);

  useEffect(() => {
    if (!selectedVideo && videoDataList.length > 0) {
      setSelectedVideo(videoDataList[0]);
    } else if (selectedVideo && videoDataList.length > 0) {
      let selected; // Declare the 'selected' variable here
      selected = videoDataList.find((video) => video.id === selectedVideo.id);
      if (selected) {
        setSelectedVideo(selected);
        fetchComments(selected.id);
        setLikes(selected.likes);
        setViews(selected.views);
      }
    }
  }, [selectedVideo, videoDataList]);

  const fetchComments = async (videoId) => {
    try {
      const response = await fetch(`https://project-2-api.herokuapp.com/videos/${videoId}?api_key=${apiKey}`);
      const data = await response.json();
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

  const handleLike = () => {
    setLikes(likes + 1);
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
            {comments && comments.length > 0 ? (
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
                  onClick={() => setSelectedVideo(videoItem)}
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