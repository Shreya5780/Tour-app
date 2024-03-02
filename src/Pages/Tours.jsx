import React, { useState, useEffect } from 'react'
import CommonSection from './../Shared/CommonSection'
import "../Styles/tour.css"
import tourData from "../assets/data/tours"
import Newsletter from "./../Shared/Newsletter"
import TourCard from "./../Shared/TourCard"
import SearchBar from "./../Shared/SearchBar"
import { Container, Row, Col } from 'reactstrap'
import TourDetails from './TourDetails'
import { BASE_URL } from '../utils/config'
import { useFetch } from '../hooks/useFetch.js'

const Tours = () => {

  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/api/tours/getAllTour?page=${page}`)
  const { data: tourCount } = useFetch(`${BASE_URL}/api/tours/search/getTourCount`)

  useEffect(() => {

    const pages = Math.ceil(tourCount / 4) //later connect backend data count
    // const pages = Math.ceil(tourCount / 8) //later connect backend data count
    setPageCount(pages)


    window.scrollTo(0, 0)
  }, [page, tourCount, tours])


  return (
    <>
        {/* {console.log(page)}
        {console.log(tourCount)}
        {console.log(tours)} */}

      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading....</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}

          {
            !loading && !error &&
            <Row>
              {tours?.map(tour => (
                // {tourData?.map(tour=> (
                <Col lg='3' className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
              
              }
                              {/* {console.log(tourCount)} */}

 </Row>
          }
              <Row>
              <Col lg='10'>
                <div className='pageNumbers align-items-center
                justify-content-center mt-4 gap-3 m-3'>
                  {[...Array(pageCount).keys()].map(number => (
                    <span key={number} onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : ""}>
                      {number + 1}
                    </span>
                  ))}

                </div>

              </Col>
              </Row>
           

        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;

