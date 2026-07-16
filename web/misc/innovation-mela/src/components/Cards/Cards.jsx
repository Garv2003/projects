import React from "react";
import EventCard from "../EventCard/EventCard";
import "./Cards.css";
import { EventData } from "../../data/EventData";

const Cards = () => {
  return (
    <>
      <h2 className="TeamHead">Innovative Events</h2>
      <p className="TeamSubHead">
        Check out our events and join us for some fun.
      </p>
      <p className="TeamSubHead2">Cash Prizes in each Category *</p>      
      <div className="cards">
        {EventData.map((event, index) => {
          return <EventCard key={index} props={event} />;
        })}
      </div>
    </>
  );
};

export default Cards;
