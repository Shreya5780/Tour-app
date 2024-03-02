import React from 'react';
import '../Styles/home.css'

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from '../Shared/Subtitle';

import SearchBar from '../Shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../Shared/Newsletter';


const Home = () => {
  return <>

    {/*/////hero section/////*/}

    <section>
      <Container>
        <Row>
          <Col lg="6">
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle Subtitle={"Know Before You Go"}></Subtitle>
                <img src={worldImg} alt="" />
              </div>
              <h1> Traveling opens the door to creating{" "}
                <span className="high">memories</span>
              </h1>
              <p>*add some paragraph*</p>
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box'>
              <img src={heroImg} alt='' />
            </div>
          </Col>
          {/* <Col lg='2'>
            <div className='hero__img-box2'>
              <video src={heroVideo} alt='' controls  />
            </div>
          </Col> */}
          <Col lg='2'>
            <div className='hero__img-box2'>
              <video src={heroVideo} alt=''  autoPlay controls />
            </div>
          </Col>

          <Col lg='2'>
            <div className='hero__img-box3'>
              <img src={heroImg02} alt='' />
            </div>
          </Col>

          <SearchBar />
        </Row>
      </Container>
    </section>

    {/*/////hero section/////*/}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className='services__subtitle'>What we serve</h5>
            <h2 className='services__title'>We offer our best services</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>
    {/*///// Featured tour section start /////// */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <Subtitle Subtitle={"Explore"} />
            <h2 className='featured__tour-title'>Our Featured Tours</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
    </section>

    {/*///// Featured tour section end ///////0 */}
    {/*///// Experienced section start ///////0 */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience_content">
              <Subtitle subtitle={"Experience"} />
              <h2> With our all experience   we will serve you </h2>
              <p>
                hello my name is..

                i visited this place..
              </p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successful Trip</h6>
              </div>
              <div className="counter__box">
                <span>
                  10k+
                </span>
                <h6>Regular client</h6>
              </div>
              <div className="counter__box">
                <span>
                  7k+
                </span>
                <h6>Worth experience</h6>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="experience__img">
              <img src={experienceImg} alt='' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*///// Experienced section end ///////0 */}
    {/*///// Gallery section start ///////0 */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <subtitle subtitle={'Gallery'} />
            <h2 className="gallery__title">Visit India through tourist's Lens</h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>
    {/*///// Gallery section end ///////0 */}
    {/*///// testimonial section start ///////0 */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={"Tourist Love"} />
            <h2 className="testimonial__title">What our Tourist say about us</h2>
          </Col>
          <Col lg="12">
            <Testimonials />
          </Col>
        </Row>
      </Container>
    </section>
    {/*///// testimonial section end ///////0 */}
    <Newsletter />

  </>

};

export default Home;