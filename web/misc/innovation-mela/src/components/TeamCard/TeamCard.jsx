import React from 'react'
import './TeamCard.css'
import cardimg from '../../assets/mait.jpg'

const TeamCard = ({props}) => {
  return (
    <div className='teamCard'>
        <img src={cardimg} alt="" className='card-img'/>
        <img src={props.img} alt="" className='profile-img'/>
        <h1>{props.name}</h1>
        <p className='job-title'>{props.designation}</p>
        <p className='aboutPerson'>
            {props.desc}
        </p>
        {/* <button className='conatctBtn'>Contact</button> */}
        {/* <div className='social-icons'>
            <a href="#"><i className="bx bxl-facebook-square"></i></a>
            <a href="#"><i className="bx bxl-twitter"></i></a>
            <a href="#"><i className="bx bxl-linkedin-square"></i></a>
            <a href="#"><i className="bx bxl-github"></i></a>
        </div> */}
    </div>
  )
}

export default TeamCard