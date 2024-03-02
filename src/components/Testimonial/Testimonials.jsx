import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'
import experienceImg from '../../assets/images/experience.png';


const Testimonials = () => {
    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow:1,
                    slidesToScroll:1,
            },
        },
        ]

    }
  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p>
        Day 1: Arrival and Immersion in Tradition
As my plane touched down in Varanasi, the air was thick with anticipation. The city, with its maze of narrow alleys and bustling markets, welcomed me with open arms. After settling into a cozy guesthouse, I embarked on a walking tour through the heart of Varanasi. The chaotic yet charming streets led me to the Vishwanath Temple, where the divine resonance of prayers filled the air.
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
        <img src={experienceImg} className ="w-25 h-10 rounded" alt=''/>
            <div>
                <h5 className="mb-0 mt-3">Ram Patel</h5>
                <p>Customer</p>
            </div>
        </div>
        <p>
        Day 1: Arrival and Immersion in Tradition
As my plane touched down in Varanasi, the air was thick with anticipation. The city, with its maze of narrow alleys and bustling markets, welcomed me with open arms. After settling into a cozy guesthouse, I embarked on a walking tour through the heart of Varanasi. The chaotic yet charming streets led me to the Vishwanath Temple, where the divine resonance of prayers filled the air.
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
        <img src={experienceImg} className ="w-25 h-10 rounded" alt=''/>
            <div>
                <h5 className="mb-0 mt-3">Ram Patel</h5>
                <p>Customer</p>
            </div>
        </div>
    </div>

  </Slider>
    
  
}

export default Testimonials;