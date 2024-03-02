import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Import required components from 'reactstrap' or your preferred UI library
import axios from 'axios';
import { BASE_URL } from '../utils/config'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Likes from './Likes';
import './PostCard.css';

const PostCard = ({ post }) => {

  return (
    <Card>
      <div className='tour__img'>
            <img src={`${BASE_URL}/${post.photo}`} alt='....' />
               
            </div>
      {/* {post.photo && <CardImg top src={`${BASE_URL}/${post.photo}`} alt="Post Image" />} */}
      <CardBody>

        <CardTitle>            <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </CardTitle>
        <CardText>{post.desc}</CardText>
        <CardText>By: {post.username}</CardText>
        <CardText>Category: {post.categories}</CardText>
        <Likes post={post} />

      </CardBody>
    </Card>
  );
};

export default PostCard;
