import React, { useState, useEffect } from 'react'
import "../Styles/tour.css"
import { Container, Row, Col } from 'reactstrap'
import { BASE_URL } from '../utils/config.js'
import { useFetch } from '../hooks/useFetch.js'
import CommonSection from '../Shared/CommonSection.jsx'
import TourCardAdmin from './TourCardAdmin.js'

const AllTours = () => {

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
                  <TourCardAdmin tour={tour} />
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
    </>
  );
};

export default AllTours;

