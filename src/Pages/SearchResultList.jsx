import React, { useState } from 'react';
import CommonSection from './../Shared/CommonSection';
import { Col, Container, Row } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import tours from '../assets/data/tours';
import TourCard from '../Shared/TourCard';
import Newsletter from '../Shared/Newsletter';

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state || []);
  console.log(data)
  
  // Render alternative UI if data is null or empty
  if (!data || data.length === 0) {
    return (
      <div>
        <CommonSection title={"Tour search result..."} />
        <section>
          <Container>
            <Row>
              <Col>
                <h4 className='text-center'>No tour found!!</h4>
              </Col>
            </Row>
          </Container>
        </section>
        <Newsletter />
      </div>
    );
  }

  // Render tour cards if data is available
  return (
    <div>
      <CommonSection title={"Tour search result..."} />
      <section>
        <Container>
          <Row>
            {data.map(tour => (
              <Col lg='3' className='mb-4' key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default SearchResultList;
