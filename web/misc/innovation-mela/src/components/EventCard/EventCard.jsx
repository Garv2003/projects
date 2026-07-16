import React from 'react'
import './EventCard.css'
import { Link } from 'react-router-dom'

const EventCard = ({props}) => {
  return (
    <div className="box">
        <span></span>
        <div class="content">
            <h2>{props.EventName}</h2>
            <p>{props.EventDesc}</p>
            <Link to={"/events/" + props.EventNumber}>Read More</Link>
        </div>
    </div>
  )
}

export default EventCard