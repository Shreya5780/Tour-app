import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup, ListGroupItem } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import tourData from '../assets/data/tours'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../Shared/Newsletter';
import { useFetch } from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import calculateAvgRating from '../utils/avgRating'
import { AuthContext } from '../context/AuthContext'
import ReviewsComponent from './GetReviews'

const TourDetails = () => {

  const { id } = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  //static data later add backend
  // const tour = tourData.find(tour => tour.id === id)

  // now add data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/api/tours/getSingleTour/${id}`)
//  Fetch reviews for the tour
 const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useFetch(`${BASE_URL}/api/reviews/${id}`);
  //destructure properties from tour object

  const { photo, title, desc, Price, address, reviews, city, distance, maxGroupSize } =
    tour;

  const { totalRating = 0, avgRating = 0 } = (reviews) || {};

  //format date

  const options = { day: "numeric", month: "long", year: "numeric" };

  //submit request to server
  const submitHandler = async e => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value


    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in")
        return;
      }

      const reviewObj = {
        tour: id,
        username: user.username,
        reviewText,
        rating: tourRating
      }
      const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      })
      const result = await res.json()
      if (!res.ok) {
        console.log(result)
        return alert(result.message)
      }

      alert(`${reviewText}, ${tourRating}`);

      setTourRating(null);
      reviewMsgRef.current.value = '';
      alert('Review submitted')
      console.log(reviewObj)
    } catch (error) {
      alert(error.message)
      console.log(error)
    }


   
    //later call api`
  }

  const handleBookTicket= async e=>{
    e.preventDefault()
    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in")
        return;
      }
      navigate(`/apicall/${id}`);
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])

  return (
    <>
      <section>
        {/* <div>
          <h3>reviews from Container</h3>
          <ReviewsComponent/>
        </div> */}
        <Container>
          {
            loading && <h4 className='text-center pt-5'>loading...</h4>
          }{
            error && <h4 className='text-center pt-5'>{error}...</h4>
          }
          {
            !loading && !error && (
              <Row>

                <Col lg='8'>
                  <div className='tour__content'>
                    <img src={`${BASE_URL}/photos/${photo}`} alt={photo} />

                    <div className='tour__info'>
                      <h2>{title}</h2>

                      <div className='d-flex align-items-center gap-5'>
                        <span className='d-flex align-items-center gap-1'>
                          <i class="ri-star-s-fill" style={{ color: "var(--secondary-color)" }}></i>
                          {calculateAvgRating == 0 ? null : avgRating}
                          {totalRating === 0 ? ('Not rated') : (
                            <span>({reviews.length})</span>
                          )}
                        </span>
                        {/**  copy paste from the tourcard.jsx span video 16:00
                              <i class=   style={{ color: "var(--secondary-color)"}}></i>
                              */}
                        <span>
                          <i class="ri-map-pin-user-fill"></i> {address}
                          {/* add address in tour.js in data folder 18:00 */}
                        </span>
                      </div>
                      <div className="tour__extra-details">
                        <span>  <i class="ri-map-pin-2-line"></i>{city}  </span>
                        <span>  <i class="ri-money-dollar-circle-line"></i> ${Price} / per person </span>
                        <span>  <i class="ri-map-pin-time-line"></i> {distance} k/m </span>
                        <span>  <i class="ri-group-line"></i>{maxGroupSize}  people</span>

                      </div>
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>

                    {/**===========tour reviews section========= */}
                    <div className="tour__reviews mt-4">
                      <h4>Reviews ({reviewsData?.length || 0} reviews)</h4>

                      <Form onSubmit={submitHandler}>
                        <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                          {[1, 2, 3, 4, 5].map((rating, index) => (
                            <span key={index} onClick={() => setTourRating(rating)} style={{ color: tourRating >= rating ? 'red' : 'black' }}>
                              {rating} <i className="ri-star-s-fill"></i>
                            </span>
                          ))}
                        </div>
                        {/* <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                          <span onClick={() => setTourRating(1)} className={tourRating >= 1 ? 'selected' : ''}> 1 <i className="ri-star-s-fill"></i></span>
                          <span onClick={() => setTourRating(2)} className={tourRating >= 2 ? 'selected' : ''}> 2 <i className="ri-star-s-fill"></i></span>
                          <span onClick={() => setTourRating(3)} className={tourRating >= 3 ? 'selected' : ''}> 3 <i className="ri-star-s-fill"></i></span>
                          <span onClick={() => setTourRating(4)} className={tourRating >= 4 ? 'selected' : ''}> 4 <i className="ri-star-s-fill"></i></span>
                          <span onClick={() => setTourRating(5)} className={tourRating >= 5 ? 'selected' : ''}> 5 <i className="ri-star-s-fill"></i></span> */}
                        {/* </div> */}


                        <div className='review__input'>
                          <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                          <button className='btn primary__btn text-white' type='submit'>
                            Submit
                          </button>
                        </div>
                      </Form>
                      <ListGroup className="user__reviews">
                                            {reviewsData?.map((review, index) => (
                                                <ListGroupItem key={index}>
                                                    <div className="review__item">
                                                        <img src={avatar} alt="" />
                                                        <div className="w-100">
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <h5>{review.username}</h5>
                                                                    <p>{new Date(review.createAt).toLocaleDateString("en-US", options)}</p>
                                                                </div>
                                                                <span className='d-flex align-items-center'>
                                                                    {review.rating} <i className="ri-start-s-fill"></i>
                                                                </span>
                                                            </div>
                                                            <h6>{review.reviewText}</h6>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                          {/* <ListGroup className="user__reviews">
                        {
                          reviews?.map(review => (
                            <div className="review__item">
                              <img src={avatar} alt="" />

                              <div className="w-100">
                                <div d-flex align-items-center justify-content-between>
                                  <div>
                                    <h5>{review.username} </h5>
                                    <p>{new Date(review.createAt).toLocaleDateString("en-US", options
                                    )}</p>
                                  </div>
                                  <span className='d-flex align-items-center'>
                                    {review.rating} <i class="ri-start-s-fill"></i>
                                  </span>
                                </div>
                                <h6>{review.reviewText} </h6>
                              </div>
                            </div>

                          ))
                        }
                      </ListGroup> */}
                    </div>
                    {/**===========tour reviews section end========= */}
                  </div>
                </Col>
                {/* <Col lg='4'>
                  <Booking tour={tour} avgRating={avgRating} />
                </Col> */}
                <Col lg='4'>
                  <h4>Book ypur tour here!!!</h4>
                  {/* <NavLink to="/apicall">Book now</NavLink> */}
                    <button type="submit" onClick={handleBookTicket}><span>Want to book train? </span><span>Click here!!</span></button>

                  <Booking tour={tour} avgRating={avgRating} />
                </Col>
              </Row>
            )
          }

        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default TourDetails


























// import React, { useContext, useEffect, useRef, useState } from 'react';
// import '../Styles/tour-details.css';
// import { Container, Row, Col, Form, ListGroup, ListGroupItem } from 'reactstrap';
// import { useParams } from 'react-router-dom';
// import avatar from '../assets/images/avatar.jpg';
// import Booking from '../components/Booking/Booking';
// import Newsletter from '../Shared/Newsletter';
// import { useFetch } from '../hooks/useFetch';
// import { BASE_URL } from '../utils/config';
// import calculateAvgRating from '../utils/avgRating';
// import { AuthContext } from '../context/AuthContext';

// const TourDetails = () => {
//     const { id } = useParams();
//     const reviewMsgRef = useRef('');
//     const [tourRating, setTourRating] = useState(null);
//     const { user } = useContext(AuthContext);

//     // Fetch tour details
//     const { data: tour, loading, error } = useFetch(`${BASE_URL}/api/tours/getSingleTour/${id}`);

//     // Fetch reviews for the tour
//     const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useFetch(`${BASE_URL}/api/reviews/${id}`);

//     // Handle review submission
//     const submitHandler = async e => {
//         e.preventDefault();
//         const reviewText = reviewMsgRef.current.value;

//         try {
//             if (!user || user === undefined || user === null) {
//                 alert("Please sign in");
//                 return;
//             }

//             const reviewObj = {
//                 tourId: id,
//                 username: user.username,
//                 reviewText,
//                 rating: tourRating
//             };

//             const res = await fetch(`${BASE_URL}/api/reviews`, {
//                 method: 'post',
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify(reviewObj)
//             });

//             const result = await res.json();
//             if (!res.ok) {
//                 console.log(result);
//                 return alert(result.message);
//             }

//             // Clear rating and review text after successful submission
//             setTourRating(null);
//             reviewMsgRef.current.value = '';

//             alert('Review submitted');
//         } catch (error) {
//             alert(error.message);
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <section>
//                 <Container>
//                     {loading && <h4 className='text-center pt-5'>Loading...</h4>}
//                     {error && <h4 className='text-center pt-5'>{error}...</h4>}
//                     {!loading && !error && (
//                         <Row>
//                             <Col lg='8'>
//                                 <div className='tour__content'>
//                                     {/* Render tour details */}
//                                 </div>

//                                 {/* Render reviews */}
//                                 <div className="tour__reviews mt-4">
//                                     <h4>Reviews ({reviewsData?.length || 0} reviews)</h4>
//                                     {/* Render reviews list */}
//                                     <ListGroup>
//                                         {reviewsData?.map((review, index) => (
//                                             <ListGroupItem key={index}>
//                                                 <div className="review__item">
//                                                     <img src={avatar} alt="" />
//                                                     <div className="w-100">
//                                                         <div className="d-flex align-items-center justify-content-between">
//                                                             <div>
//                                                                 <h5>{review.username}</h5>
//                                                                 <p>{new Date(review.createdAt).toLocaleDateString()} - {new Date(review.updatedAt).toLocaleDateString()}</p>
//                                                             </div>
//                                                             <span className='d-flex align-items-center'>
//                                                                 {review.rating} <i className="ri-start-s-fill"></i>
//                                                             </span>
//                                                         </div>
//                                                         <h6>{review.reviewText}</h6>
//                                                     </div>
//                                                 </div>
//                                             </ListGroupItem>
//                                         ))}
//                                     </ListGroup>
//                                 </div>
//                             </Col>
//                             <Col lg='4'>
//                                 <Booking tour={tour} />
//                             </Col>
//                         </Row>
//                     )}
//                 </Container>
//             </section>
//             <Newsletter />
//         </>
//     );
// };

// export default TourDetails;
