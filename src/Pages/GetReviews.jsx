// import React, { useEffect, useState } from 'react';
// import { ListGroup, ListGroupItem } from 'reactstrap'; // Assuming you're using Reactstrap
// import axios from 'axios'; // Assuming you're using Axios for HTTP requests
// import { BASE_URL } from '../utils/config';

// const ReviewsComponent = ({ tourId }) => {
//     const [reviewsData, setReviewsData] = useState([]);

//     useEffect(() => {
//         // Fetch reviews data for the specific tour ID
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/reviews/${tourId}`); // Assuming your backend endpoint is '/api/reviews/:tourId'
//                 const reviewsData = response.data.data; // Accessing the data property
//                 setReviewsData(reviewsData);
//             } catch (error) {
//                 console.error('Error fetching reviews:', error);
//             }
//         };

//         fetchReviews(); // Call the fetchReviews function when component mounts
//     }, [tourId]);

//     const options = { /* Your date options */ };

//     return (
//         <ListGroup className="user__reviews">
//             {reviewsData.map((review, index) => (
//                 <ListGroupItem key={index}>
//                     <div className="review__item">
//                         <img src={review.avatar} alt="" /> {/* Assuming review object has an avatar property */}
//                         <div className="w-100">
//                             <div className="d-flex align-items-center justify-content-between">
//                                 <div>
//                                     <h5>{review.username}</h5>
//                                     <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p> {/* Assuming createdAt is the review creation date */}
//                                 </div>
//                                 <span className='d-flex align-items-center'>
//                                     {review.rating} <i className="ri-start-s-fill"></i>
//                                 </span>
//                             </div>
//                             <h6>{review.reviewText}</h6>
//                         </div>
//                     </div>
//                 </ListGroupItem>
//             ))}
//         </ListGroup>
//     );
// };

// export default ReviewsComponent;






import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useParams } from 'react-router-dom';

const ReviewsComponent = () => {
  const { tourId } = useParams()
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/reviews/${tourId}`);
                const reviewsData = response.data.data;
                setReviewsData(reviewsData);
                console.log(tourId)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const options = { /* Your date options */ };

    // Filter reviews based on tourId
    const filteredReviews = reviewsData.filter(review => review.tour === tourId);

    return (
        <div>
          <h2>{tourId} </h2>
            {filteredReviews.length > 0 ? (
                <ListGroup className="user__reviews">
                    {filteredReviews.map((review, index) => (
                        <ListGroupItem key={index}>
                            <div className="review__item">
                                <img src={review.avatar} alt="" />
                                <div className="w-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h5>{review.username}</h5>
                                            <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
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
            ) : (
                <p>No reviews found for this tour.</p>
            )}
        </div>
    );
};

export default ReviewsComponent;
