import React from 'react'
import './ContactBox.css'

// S.No	Name	Designation	Responsibility	Email
// 1	Prof. Namita Gupta	Professor	Organising Secretary	namita@mait.ac.in
// 1	Ms. Ruchi Goel	Assistant Professor	 Convener	ruchigoel@mait.ac.in
// 2	Mr. Ashish Sharma	Assistant Professor	 Convener	ashish@mait.ac.in

// 3	Mr. Anupam Kumar	Assistant Professor	 Convener	anupamkumar@mait.ac.in

// 4	Mr. Alok Sharma	Assistant Professor	Co-Convener	alok@mait.ac.in
// 5	Dr. Yogesh Sharma	Assistant Professor	Co-Convener	yogeshsharma@mait.ac.in
// 6	Dr. Sandeep Tayal	Assistant Professor	Co-Convener	sandeeptayal@mait.ac.in
// 7	Ms. Garima Gupta	Assistant Professor	Co-Convener	garimagupta@mait.ac.in
// 8	Dr. Nisha Aggarwal	Assistant Professor	Co-Convener	nishaa@mait.ac.in


const FacultyDetails = [
  {
    name: 'Prof. Namita Gupta',
    role: 'Organising Secretary',
    contact: '+91-1234567890',
    email: 'namita@mait.ac.in'
  },
  {
    name: 'Ms. Ruchi Goel',
    role: 'Convener',
    contact: '+91-1234567890',
    email: 'ruchigoel@mait.ac.in'
  },
  {
    name: 'Mr. Ashish Sharma',
    role: 'Convener',
    contact: '+91-1234567890',
    email: 'ashish@mait.ac.in'
  },
  {
    name: 'Mr. Anupam Kumar',
    role: 'Convener',
    contact: '+91-1234567890',
    email: 'anupamkumar@mait.ac.in'
  },
  {
    name: 'Mr. Alok Sharma',
    role: 'Co-Convener',
    contact: '+91-1234567890',
    email: 'alok@mait.ac.in'
  },
  {
    name: 'Dr. Yogesh Sharma',
    role: 'Co-Convener',
    contact: '+91-1234567890',
    email: 'yogeshsharma@mait.ac.in'
  },
  {
    name: 'Dr. Sandeep Tayal',
    role: 'Co-Convener',
    contact: '+91-1234567890',
    email: 'sandeeptayal@mait.ac.in'
  },
  {
    name: 'Ms. Garima Gupta',
    role: 'Co-Convener',
    contact: '+91-1234567890',
    email: 'garimagupta@mait.ac.in'
  },
  {
    name: 'Dr. Nisha Aggarwal',
    role: 'Co-Convener',
    contact: '+91-1234567890',
    email: 'nishaa@mait.ac.in'
  }
]

// Saksham Gupta +91-9871012714 
// -Vidhi Jain +91-9354161478
//  -Ishaan Sangwan +91-9911589022
// -Ansh Goyal: +91-9582821205
// -Mayan Bhandari:+91-9958527919


const StudentDetails = [
  {
    name: 'Saksham Gupta',
    contact: '+91-9871012714'
  },
  {
    name: 'Vidhi Jain',
    contact: '+91-9354161478'
  },
  {
    name: 'Ishaan Sangwan',
    contact: '+91-9911589022'
  },
  {
    name: 'Ansh Goyal',
    contact: '+91-9582821205'
  },
  {
    name: 'Mayan Bhandari',
    contact: '+91-9958527919'
  },
  {
    name: 'Jai Sukheja',
    contact: '+91-8595717162'
  }
]



const ContactBox = () => {
  return (
    <div className="contact_us">
        <ul className="contact_list">
        <li>
          <strong>Faculty Contact Details: </strong>
          <div className="contact_SubList">
            {FacultyDetails.map((faculty, index) => {
              return (
                <div key={index} className="contact_details">
                  <span>{faculty.name}</span>
                  <i>({faculty.role})</i>
                  <p>{faculty.email}</p>
                  {/* <span>{faculty.contact}</span> */}
                </div>
              )
            })}
          </div>
        </li>
        <li>
          <strong>Student Contact Details: </strong>
          <div className="contact_SubList">
            {StudentDetails.map((faculty, index) => {
              return (
                <div key={index} className="contact_details">
                  <span>{faculty.name}</span>
                  {/* <i>({faculty.role})</i> */}
                  {/* <p>{faculty.email}</p> */}
                  <i>{faculty.contact}</i>
                </div>
              )
            })}
          </div>
        </li>
               
      </ul>
    </div>
  )
}

export default ContactBox