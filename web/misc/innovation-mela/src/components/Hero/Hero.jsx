import React from 'react'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero'>
        <h1>Innovation Mela'24 MAIT</h1>
        <p>The Department of Computer Science & Engineering , Maharaja Agrasen Institute of Technology, Delhi is organising innovation Mela on  February 22, 2024. This event is themed on "Smart Horizons: Innovations Shaping Future Cities," highlighting the pivotal role of innovation and technology in shaping the future of urban landscapes, particularly focusing on Smart Cities.</p>
        <button className='downloadBtn'>
          <a href='/brochure.pdf' download='brochure.pdf'>Download Brochure</a>
        </button>


    </div>
  )
}

export default Hero