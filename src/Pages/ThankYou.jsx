import React, { useContext, useState } from 'react'
import { Container,Row,Col,Button} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import '../Styles/thank-you.css'
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const ThankYou = ({tour}) => {
  const navigate = useNavigate()
  const {title} = tour || {};

  const {user} = useContext(AuthContext)

  const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize:1,
      bookAt:'',
  });

//send data to the server
    // const handleClick = async e =>{
    //     e.preventDefault()
    //     console.log(booking)
    //     try {
    //         if(!user || user===undefined || user===null){
    //           return alert("Please sign in")
    //         }
        
              
    //           const res = await fetch(`${BASE_URL}/api/booking/book`, {
    //             method: 'post',
    //             headers:{
    //               'content-type': 'application/json'
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify(booking)
    //           })
    //           const result = await res.json()
    //           if(!res.ok){
    //             console.log(result)
    //             return alert(result.message)
    //           } 
    //           navigate("/");

    //           // alert('Review submitted')
    //         } catch (error) {
    //           alert(error.message)
    //           console.log(error)
    //         }

    // }

  return <section>
   <Container>
    <Row>
      <Col lg='12' className='pt-5 text-center'>
        <div className="thank__you">
          <span><i class="ri-checkbox-circle-line"></i></span>
          <h1 className="mb-3 fw-semibold">Thank you</h1>
          <h3 className=" mb-4">Your tour is booked.</h3>

          {/* <Button className='btn primary__btn w-25' onClick={handleClick}>
            <Link to="/home">Click here to confirm!!!</Link>
          </Button> */}
        </div>
      </Col>
    </Row>
   </Container>
  </section>
 
};

export default ThankYou;
