import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Import required components from 'reactstrap' or your preferred UI library
import axios from 'axios';
import { BASE_URL } from '../utils/config'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import {Link} from 'react-router-dom';

const Likes = ({ post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(false);
  
    const handleLike = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/posts/like/${post._id}`);
        setLikes(response.data.likes);
        setLiked(true);
        localStorage.setItem(`liked_post_${post.id}`, 'true'); 
      } catch (error) {
        console.error('Error liking post:', error);
      }
    };
  
    const handleUnlike = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/posts/unlike/${post._id}`);
        setLikes(response.data.likes);
        setLiked(false);
        localStorage.removeItem(`liked_post_${post.id}`); 
  
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    };
  
    useState(() => {
      const isLiked = localStorage.getItem(`liked_post_${post.id}`);
      if (isLiked === 'true') {
        setLiked(true);
      }
    }, [post.id]);
  
 
  return (
   
       
       
        <div>
        <FaThumbsUp
          color={liked ? "blue" : "black"}
          onClick={liked ? handleUnlike : handleLike}
          style={{ marginRight: '10px', cursor: 'pointer' }}
        />
        <FaThumbsDown
          color={!liked ? "red" : "black"}
          onClick={!liked ? handleLike : handleUnlike}
          style={{ cursor: 'pointer' }}
        />
        <span>Likes: {likes}</span>
      </div>
       
    
  );
};

export default Likes;
