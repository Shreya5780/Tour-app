import React from 'react'
import './newsletter.css'

import { Container, Row, Col} from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const Newsletter = () => {
  return <section className="newsletter">
    <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe now to get updates and information regularly.
                    </h2>

                    <div className="newsletter__input">
                        <input type ="email" placeholder="Enter Your Email" />
                        <button className="btn newsletter__btn">Subscribe</button>
                    </div>
                    <p>
                    Day 1: Arrival and Immersion in Tradition
As my plane touched down in Varanasi, the air was thick with anticipation. The city, with its maze of narrow alleys and bustling markets, welcomed me with open arms. After settling into a cozy guesthouse, I embarked on a walking tour through the heart of Varanasi. The chaotic yet charming streets led me to the Vishwanath Temple, where the divine resonance of prayers filled the air.
                    </p>
                </div>
            </Col>
            <Col lg="6">
                <div className="newsletter__img">
                    <img src={maleTourist} alt=" "/>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default Newsletter