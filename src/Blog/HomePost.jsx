import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { BASE_URL } from '../utils/config'; // Import the base URL for API requests
import Posts from './GetAllPost';

const HomePost = ({ posts }) => {
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <Link to="/createPost">
              <Button color="primary">Create Post</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3">
       <Posts/>
      </Container>
    </div>
  );
};

export default HomePost;
