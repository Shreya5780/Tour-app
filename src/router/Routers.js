import React from 'react';
import {Routes,Route,Navigate, useParams } from 'react-router-dom'

import Home from '../Pages/Home.jsx';
import Tours from '../Pages/Tours';
import Blogs from '../Pages/Blogs';
import TourDetails from '../Pages/TourDetails';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import SearchResultList from '../Pages/SearchResultList';
import ThankYou from '../Pages/ThankYou.jsx';
import Newsletter from '../Shared/Newsletter.jsx';
import CreateTourForm from '../Admin/tourForm.js';
import TourList from '../Admin/allTours.js';
import PNRComponent from '../API/IRCTC/PNRComponent.js';
import FlightSearch from '../API/FlightSearch.js';
import CreatePost from '../Blog/CreatePost.jsx';
import EditPost from '../Blog/EditPost.jsx';
import PostDetails from '../Blog/PostDeatils.jsx';
import CreatePostForm from '../Blog/postForm.jsx';
import HomePosts from '../Blog/HomePost.jsx';
import HomePost from '../Blog/HomePost.jsx';
import AllTours from '../Admin/allTours.js';
import EditTourForm from '../Admin/EditTour.js';
import { Payment } from '../components/Booking/Payment.jsx';
import TrainApi from '../API/IRCTC/TrainApi.jsx';
import Booking from '../components/Booking/Booking.jsx';

const DynamicSearchResultList = () => {
  const { city, distance, maxGroupSize } = useParams();
  return <SearchResultList city={city} distance={distance} maxGroupSize={maxGroupSize} />;
};

const Routers = () => {
  return (
    
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/tours' element={<Tours/>} />
        <Route path='/tours/:id' element={<TourDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<CreateTourForm/>} />
        <Route path='/admin/alltours' element={<AllTours/>} />
        <Route path='/admin/editTour/:id' element={<EditTourForm/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/api/tours/search/getTourBySearch' element={<DynamicSearchResultList  />} />
        {/* <Route path='/blogs' element={<Blogs/>}/> */}
        <Route path='/blogs' element={<HomePost/>}/>
        <Route path='/createPost' element={<CreatePost />}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/booking/:id' element={<Booking/>}/>
        <Route path='/posts/edit/:id' element={<EditPost />}/>
        {/* <Route path='/apicall' element={<PNRComponent/>}/> */}
        <Route path='/apicall/:id' element={<TrainApi/>}/>
        {/* <Route path='/payment' element={<Payment/>}/> */}
    </Routes>

    
    
  );
};

export default Routers