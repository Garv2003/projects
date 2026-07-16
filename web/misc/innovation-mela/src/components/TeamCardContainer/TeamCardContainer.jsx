import React from 'react'
import TeamCard from '../TeamCard/TeamCard'
import './TeamCardContainer.css'

import img1 from '../../assets/namita.webp' 
import img2 from '../../assets/teach4.webp'
import img3 from '../../assets/teach1.webp'
import img4 from '../../assets/teach3.webp'
import img5 from '../../assets/garima.webp'
import img6 from '../../assets/sandeep.webp'
import img7 from '../../assets/teach.webp'
import img8 from '../../assets/ahlok.webp'
import img9 from '../../assets/ashish.webp'

const org = [
  {
    name: 'Prof.(Dr) Namita Gupta',
    designation: "HOD (CSE)",
    desc: '"Believe in your abilities, embrace your potential, and never underestimate your capacity to achieve greatness."',
    img: img1
  },
]

const coor = [
  {
    name: 'Ms. Ruchi Goel',
    designation: "Assistant Professor",
    desc: '"Your journey may be tough, but remember, so are you. Keep pushing forward, and you will reach heights you never thought possible."',
    img: img2
  },
  {
    name: 'Mr. Ashish Sharma',
    designation: "Assistant Professor",
    desc: '"Don\'t be afraid to take risks, to step out of your comfort zone, and to pursue your passions relentlessly. Greatness lies beyond the boundaries of fear."',
    img: img9
  },
  {
    name: 'Mr. Anupam Kumar',
    designation: "Assistant Professor",
    desc: '"In the face of adversity, remember that every setback is a setup for a comeback. Keep your head held high, your heart strong, and your dreams alive."',
    img: img4
  }
]
const memb = [
  {
    name: 'Mr. Alok Sharma',
    designation: "Assistant Professor",
    desc: '"You are the author of your own story. Write one that inspires, challenges, and ultimately leads to your greatest triumphs."',
    img: img8
  },
  {
    name: 'Dr. Yogesh Sharma',
    designation: "Assistant Professor",
    desc: '"The path to success is paved with perseverance, dedication, and resilience. Keep going, even when it gets tough."',
    img: img3
  },
  {
    name: 'Dr. Sandeep Tayal',
    designation: "Assistant Professor",
    desc: '"You have within you the strength, the patience, and the passion to reach for the stars and change the world. Believe in yourself, and anything is possible"',
    img: img6
  },
  {
    name: 'Ms. Garima Gupta',
    designation: "Assistant Professor",
    desc: '"Success is not determined by how many times you fall, but by how many times you rise after falling. Keep getting up, keep moving forward."',
    img: img5
  },
  {
    name: 'Ms. Nisha Aggarwal',
    designation: "Assistant Professor",
    desc: '"Your journey is unique, your dreams are valid, and your potential is limitless. Embrace the challenges, for they are the stepping stones to your success."',
    img: img7
  }
]

const TeamCardContainer = () => {
  return (
    <div className='TeamCardContainer'>
      
    <h2 className='TeamHead'>Our Team</h2>
    <p className='TeamSubHead'>Meet the team that makes it all happen.</p>
    <h3 className='TeamSechead'>
    Organising Secretary
    </h3>
    <div className='teamSection'>
      {
        org.map((team, index) => {
          return <TeamCard key={index} props={team} />;
        })
      }
    </div>  
    <h3 className='TeamSechead'>
        Coordinators
    </h3>
    <div className='teamSection'>
      {
        coor.map((team, index) => {
          return <TeamCard key={index} props={team} />;
        })
      }
    </div>
    <h3 className='TeamSechead'>
        Members
    </h3>
    <div className='teamSection'>
      {
        memb.map((team, index) => {
          return <TeamCard key={index} props={team} />;
        })
      }
    </div>
    </div>
  )
}

export default TeamCardContainer