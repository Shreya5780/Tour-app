import React,{useContext, useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../Styles/login.css'

import RegisterImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {

  const [credentials, setCredentials] = useState({
    username:undefined,
    email:undefined,
    password:undefined,
});

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e =>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
};

  const handleClick = async e =>{
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'post',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const result = await res.json()
      console.log(result)
      if(!res.ok) 
      {
        alert("Can't able to register!! Try again....")
        // console.log(result.message)

      }
      
      if(res.ok)  navigate('/login')
      dispatch({type: 'REGISTER_SUCCESS'})
    } catch (error) {
      alert(error.message)
    }
  }

  return <section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
           <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={RegisterImg} alt="" />
            </div>
            <div className="login__form">
            <div className="user">
              <img src={userIcon} alt="" />
            </div>
            <h2>Register</h2>
            <Form onSubmit={handleClick}>
                <FormGroup>
                  <input className='m-5' type="text" placeholder='Username' required id='username'
                  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input className='m-5' type="email" placeholder='Email' required id='email'
                  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <input className='mt-2' type="password" placeholder='Password' required id='password'
                  onChange={handleChange}/>
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type="submit">Create Account</Button>
            </Form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
           </div>
        </Col>
      </Row>
    </Container>
  </section>
   
};

export default Register;