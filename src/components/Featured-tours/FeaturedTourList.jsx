

import React from 'react';
import TourCard from '../../Shared/TourCard';
import tourData from '../../assets/data/tours';
import { Col } from 'reactstrap';
import { useFetch } from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedTourList = () => {

  const {data: FeaturedTours, loading, error} = useFetch(`${BASE_URL}/api/tours/search/getFeaturedTours`)
  console.log(FeaturedTours)

  return (
     <>
     {
      loading && <h5 className=''>Loading.............</h5>
     }
     {
      error && <h4>{error}.............</h4>
     }

      {/* {tourData?.map(tour =>( */}
      {!loading && !error && FeaturedTours?.map(tour =>(
        <Col lg='3' className='mb-4' key={tour._id}>
            <TourCard tour={tour} />
           </Col>
        ))
      }
    </>
  );
};

export default FeaturedTourList;
