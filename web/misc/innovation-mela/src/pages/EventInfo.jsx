import "./EventsInfo.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { EventData } from "../data/EventData";

const EventInfo = () => {
  const { id } = useParams();

  return (
    <div className="event_info">
      <h1>{EventData[id - 1].EventName}</h1>
      <div>
        <img src={EventData[id - 1].EventImg} alt="" />
      </div>
      <div className="desc">
        <div>
        About 
        </div>
        <span>
        {EventData[id - 1].EventDesc}
        </span>
        </div>
        {
          EventData[id - 1].EventPrizeTitles && 
          <div>
          <h3>Competition Prize Titles:
          </h3>
          <ul>
            {EventData[id - 1].EventPrizeTitles.map((prize, index) => {
              return (
                <li key={index}>
                  <h2>{prize}</h2>
                </li>
              );
            })}
         
          </ul>
          <sup>  * Terms and Conditions Applied </sup>
          </div>

        }
      <h3>
        Venue:
        <span>{EventData[id - 1].EventVenue}</span>
      </h3>
      <h3>
        Date: 
        <span>{EventData[id - 1].EventDate}</span>
      </h3>
      <h3>
      Time:
        <span> {EventData[id - 1].EventTime}</span>
      </h3>
      <div className="neon-button">
        <Link to={EventData[id - 1].EventRegLink} target="_blank">
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default EventInfo;
