import React,{useRef} from 'react';
import './search-bar.css';
import {Col, Form,FormGroup } from "reactstrap";
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from '../utils/config'

const SearchBar = () => {

       const locationRef = useRef('')
       const distanceRef = useRef(0)
       const maxGroupSizeRef = useRef(0)
       const navigate = useNavigate()

       const searchHandler = async() =>{
          const location = locationRef.current.value.trim()
          const distance = distanceRef.current.value.trim()
          const maxGroupSize = maxGroupSizeRef.current.value.trim()

  //         try {
  //           if(location === '' || distance === '' || maxGroupSize === ''){
  //             return alert ("All fields are required!!");
  //           }
  
  //         //   /*
  //           const res = await fetch(`${BASE_URL}/api/tours/search/getTourBySearch?
  //           city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
  // // console.log(res)
  //           if(!res.ok){
  //             alert('Somethong went wrong...')
  //           }
  
  //           const result = await res.json()
  //         //   console.log(result)
  try {
    if (location === '' || distance === '' || maxGroupSize === '') {
      return alert('All fields are required!!');
    }

    const res = await fetch(
      `${BASE_URL}/api/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) {
      return alert('Something went wrong...');
    }

    const result = await res.json();

    if (!result.data || result.data.length === 0) {
      return alert('No tours found matching your criteria.');
    }
            
            navigate(`/api/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {state: result.data}
            )
          } catch (error) {
           console.log(error.message) 
          }
         
        //   */

//           const url = new URL(`${BASE_URL}/search/getTourBySearch`);
//           url.searchParams.append('city', location);
//           url.searchParams.append('distance', distance);
//           url.searchParams.append('maxGroupSize', maxGroupSize);
      
//           const res = await fetch(url);
      
//           if (!res.ok) {
//               alert('Something went wrong');
//           }
      
//           const result = await res.json();
//           navigate(`/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
        //   navigate(url.toString(), { state: result.data });
       }

  return (
    <Col lg='12'>
       <div className="search__bar">
            <Form className='row g-3 align-items-center'>
                <FormGroup className='col-md-4 gap-3 form__group form__group-fast'>
                    <span>
                        <i className="ri-map-pin-line"></i>
                        </span>
                    <div>
                        <h6>Location</h6>
                        <input type='text' placeholder='Where are you going?'  ref={locationRef}/>
                    </div>
                </FormGroup>
                <FormGroup className='col-md-4 gap-3 form__group form__group-fast'>
                    <span>
                        <i className="ri-map-pin-time-line"></i>
                        </span>
                    <div>
                        <h6>Distance</h6>
                        <input type='number' placeholder='Distance km' ref={distanceRef} />
                    </div>
                </FormGroup>
                <FormGroup className='col-md-4 gap-3 form__group form__group-last'>
                    <span>
                    <i className="ri-group-line"></i>
                        </span>
                    <div>
                        <h6>Max People</h6>
                        <input type='number' placeholder='0'  ref={maxGroupSizeRef}/>
                    </div>

                    <button className='search__icon' type='button' onClick={searchHandler}>
                    <i className="ri-search-line"></i>
                    </button>
                </FormGroup>
                

            </Form>
        </div> 


        
    </Col>
  )
}

export default SearchBar;

