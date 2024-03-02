import React from 'react';
import ReactDOM from "react-dom/client";

import Header from "../Header/header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const layout = () => {
  return(
    <>
    <div>
    {/* <div > */}
    <Header />
    {/* </div> */}
    <div className='content pt-5'>
    <Routers />
    </div>

    </div>
   
    <Footer />
    
    </>
  );
};
 

export default layout;