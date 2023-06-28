import React, { useState, useEffect } from 'react';
import videoDataList from '../../data/video-details.json';
import './main.scss';
import viewsIcon from '../../assets/images/views.svg';
import likesIcon from '../../assets/images/likes.svg';
import avatar from "../../assets/images/Mohan-muruge.jpg";

const VideoPlayer = ({ selected, setSelected }) => {
    const [videoData, setVideoData] = useState({
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "BMX Rampage: 2021 Highlights",
        "channel": "Red Cow",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels, unleashing some of the biggest moments the sport has ever seen. While mother nature only allowed for one full run before the conditions made it impossible to ride, that was all that was needed for event veteran Kyle Strait, who won the event for the second time -- eight years after his first Red Cow Rampage title",
        "views": "1,001,023",
        "likes": "110,985",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Micheal Lyons",
                "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
                "likes": 0,
                "timestamp": 1628522461000
            },
            {
                "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                "name": "Gary Wong",
                "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
                "likes": 0,
                "timestamp": 1626359541000
            },
            {
                "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
                "name": "Theodore Duncan",
                "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
                "likes": 0,
                "timestamp": 1626011132000
            }
        ]
    });
    // I define the setVideo to be first the BMX Rampage video even though null here


    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch('../../data/video-details.json');
                const data = await response.json();
                setVideoData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, []);


    // The second block of useEffect allows me to set the default if selected is null or not selected


    useEffect(() => {
        if (!selected) {
            const selectedVideo = videoDataList.find((video) => video.id === '84e96018-4022-434e-80bf-000ce4cd12b8');
            if (selectedVideo) {
                setVideoData(selectedVideo);
            }
        } else if (videoData && selected) {
            const selectedVideo = videoDataList.find((video) => video.id === selected);
            if (selectedVideo) {
                setVideoData(selectedVideo);
            }
        }
    }, [videoData, selected]);

    const { title, channel, image, description, views, likes, duration, video } = videoData;

    return (
        <div>
            <div className="video">
                <video controls poster={image} className="video__player">
                    <source src={video} type="video/mp4" className="video__player" />
                </video>
            </div>
            <div className="movie__information">
                <div className="movie__information--words">
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <div className="movie__description">
                        <h2 className="channel__style">By: {channel}</h2>
                        <div className="movie__stats">
                            <img src={viewsIcon}></img>
                            <p className="movie__stats--color">{views}</p>
                        </div>
                        <div className="movie__stats">
                            <img src={likesIcon}></img>
                            <p className="movie__stats--color" >{likes}</p>
                        </div>
                    </div>
                    <div className="movie__verbage">
                        <h3>{description}</h3>
                    </div>
                    <div className="comment__title">
                        <h2>Comments</h2>
                    </div>
                    <div className ="comment__title">
                        <img src = {avatar} className = "avatar"></img>
                        <div className = "commentary__box">
                            <h3>Join the Conversation</h3>
                            <input type="text" placeholder="Add a New Comment" />
                        </div>
                        <div className = "submission__box">
                            <button className ="upload__comment">COMMENT</button>
                        </div>
                    </div>
                </div>
                <div className="movie__component">
                    <h3 className="lightHeading">
                        NEXT MOVIES
                    </h3>
                    <div>
                        <ul className="movie__list">
                            {videoDataList.map((videoItem) => (
                                <li
                                    key={videoItem.id}
                                    id={videoItem.id}
                                    title={videoItem.title}
                                    onClick={() => setSelected(videoItem.id)}
                                    className={`${selected === videoItem.id ? 'selected ' : ''
                                        } movie__component--carousel`}
                                >
                                    <img className="image__peak" src={videoItem.image} alt={videoItem.title} />
                                    <div>
                                        <h3 className="movie__list--titles">{videoItem.title} </h3>
                                        <h2 className="movie__list--titles">{videoItem.channel} </h2>
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

export default VideoPlayer;