import React from 'react';
import ReactDOM from "react-dom/client";

import Header from "../Header/header";
import Routers from "./../router/Routers";
import Footer from "../Footer/Footer";

const layout = () => {
  return(
    <>
    <Header />
    <Routers />
    <Footer />
    </>
  );
};
 

export default layout;