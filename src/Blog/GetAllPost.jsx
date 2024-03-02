import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import TourCard from './../Shared/TourCard';
// import SearchBar from './../Shared/SearchBar';
// import Newsletter from './../Shared/Newsletter';
// import CommonSection from './../Shared/CommonSection';
import { BASE_URL } from '../utils/config';
import { useFetch } from '../hooks/useFetch';
import PostCard from './PostCard';
import './Post.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const posts = await fetch(`${BASE_URL}/api/posts/getall`);
      if (!posts.ok) {
        throw new Error('Failed to fetch posts');
      }
      const responseData = await posts.json();
      console.log('Received data:', responseData); // Check the data structure
      const { data } = responseData; // Extract the 'data' field from the response
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/posts/getall`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch posts');
//       }
//       const data = await response.json();
//       setPosts(data);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* <CommonSection title="All Posts" /> */}
      <div className='posts-container'>
        <h2>All posts</h2>
      </div>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {posts.map(post => (
                <Col lg="4" className="post-card" key={post._id}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
      {/* <Newsletter /> */}
    </>
  );
};

export default Posts;
