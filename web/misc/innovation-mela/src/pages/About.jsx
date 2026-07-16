import "./About.css";
import img from "../assets/clg.jpeg";
import robot from "../assets/robot.jpg";
import mait from "../assets/mait.jpg";
import lib from "../assets/lib.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about_header">
        <h2>About GGSIPU</h2>
        <p>
          Guru Gobind Singh Indraprastha University (GGSIPU) is the first
          University established in 1998 by Govt. of NCT of Delhi under the
          provisions of Guru Gobind Singh Indraprastha University Act, 1998 read
          with its Amendment in 1999 The University is recognized by University
          Grants Commission (UGC), India under section 12B of UGC Act. The Guru
          Gobind Singh Indraprastha University has been Accredited with a CGPA
          of 3.56 on a seven-point scale at A++ Grade valid for a period of 7
          years from 14-02-2023. It is a teaching and affiliating University
          with the explicit objective of facilitating and promoting “studies,
          research and extension work in emerging areas of higher education with
          focus on professional education, for example engineering, technology,
          management studies, medicine, pharmacy, nursing, education, law, etc.
          and also to achieve excellence in these and connected fields and other
          matters connected therewith or incidental thereto.
        </p>
      </div>
      <div className="about_header">
        <h2>About the institute</h2>
        <div className="about_box">
          <img src={mait} alt="" />
          <p>
            Maharaja Agrasen Institute of Technology was established in 1999 by
            Maharaja Agrasen Technical Education Society promoted by a group of
            well known Industrialists, Businessman, Professionals and
            Philanthropists with an aim to promote quality education in the
            field of Technology and Management. Since then, MAIT has grown from
            strength to strength to emerge as one of the top technical
            institutes among the private Institutes and has been constantly
            ranked amongst the top engineering Institutes by DATAQUEST.
            Institute offers Bachelor&apos;s Degree in 13 disciplines of
            Engineering - CSE, CST, ECE, EEE, IT, ITE, MAE, ME, AI &ML, CSE
            (Artificial Intelligence), CSE (Data Science), Electronics
            Engineering (VLSI Design and Technology), ECE (Advanced
            Communication Technology), BBA 3 Year and Postgraduate degree in
            MBA.
          </p>
        </div>
      </div>
      <div className="about_header">
        <h2>About CSE Department</h2>
        <div className="about_box">
          <p>
            Department was established in year 1999. The Department offers
            B.Tech. degree affiliated to GGSIPU, Delhi. Department has a team of
            experienced and highly qualified faculty who are committed to
            providing quality education to the students. Department offers a
            comprehensive learning experience, combining theoretical knowledge
            with practical skills. The curriculum is designed to meet the
            current industry demands and trends, and department offers
            specializations in following areas: Artificial Intelligence,
            Artificial Intelligence and Machine Learning, Machine Learning and
            Data Analytics, Full Stack Development.
          </p>
          <img src={img} alt="" />
        </div>
      </div>
      <div className="about_header">
        <h2>Event highlights</h2>
        <h5>Explore a World of Innovation</h5>
        <div className="about_container">
          <ul>
            <li>
              Explore a World of Innovation Expert Talks: Gain insights from
              industry leaders sharing knowledge on current trends and
              developments.
            </li>
            <li>
              Pitching Competition: Showcase your innovative ideas to a panel of
              judges and win recognition and support.
            </li>
            <li>
              Innovative Idea Exhibition: Explore a diverse display of creative
              concepts pushing boundaries.
            </li>
            <li>
              Innovative Product Exhibition: Witness pioneering products reshaping industries.
            </li>
            <li>
              Latest Technologies Workshop: Hands-on sessions to stay ahead with
              cutting-edge tools and methodologies.
            </li>
            <img src={robot} alt="robot" />
          </ul>
          <ul>
            <li>
              Educational Workshops: Organize a Workshop on Latest Technologies
              based on Smart Cities, aiming to educate participants on the most
              recent advancements in technology relevant to urban development.
            </li>
            <li>
              Networking Opportunities: Create a conducive environment for
              networking among participants, industry experts, and innovators,
              fostering collaboration and partnership opportunities.
            </li>
            <li>
              Inspiring Creativity: Cultivate a culture of creativity and
              forward-thinking among students and participants, encouraging them
              to explore new ideas and contribute to the ongoing transformation
              of cities into smart, sustainable entities.
            </li>
            <li>
              Promoting Sustainability: Emphasize the importance of
              sustainability in innovation, encouraging projects and ideas that
              contribute to environmentally friendly and resource-efficient
              Smart Cities.
            </li>
            <li>
              {" "}
              Celebrating Success: Recognize and reward outstanding
              contributions by providing a platform for participants to receive
              accolades and prizes, motivating them to continue their pursuit of
              innovative solutions for Smart Cities.
            </li>
          </ul>
        </div>
      </div>
      <div className="about_header">
        <h2>About the event</h2>
        <div>
          <div className="about_box">
            <p>
              We invites students, innovators, and entrepreneurs to explore the
              limitless possibilities of Smart Cities. Our platform provides a
              unique opportunity to exhibit groundbreaking projects, engage in
              insightful Expert Talks, participate in a thrilling Pitching
              competition, and showcase innovations in the form of the
              Innovative Idea Exhibition and Innovative Products Stalls. Join us
              in the exploration of the Workshop on Latest Technologies based on
              Smart Cities, as we collectively foster creativity,
              entrepreneurship, and technological innovation, contributing to
              the future landscape of our cities. Embrace "Smart Horizons" and
              be part of shaping the cities of tomorrow.
            </p>
            <img src={lib} alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="about_header">
        <h2>Objectives</h2>
        <div className="about_container">
          <ul>
            <li>
              {" "}
              Showcasing Innovations: Provide a prominent platform for students,
              innovators, and entrepreneurs to showcase their pioneering
              projects and innovations related to Smart Cities.
            </li>
            <li>
              Knowledge Exchange through Expert Talks: Facilitate
              knowledge-sharing by organizing Expert Talks where industry
              leaders, experts, and thought influencers discuss emerging trends
              and advancements in Smart Cities.
            </li>
            <li>
              {" "}
              Fostering Entrepreneurship: Inspire and nurture entrepreneurship
              by hosting a Pitching competition, encouraging participants to
              present innovative business ideas that contribute to the
              development of Smart Cities.
            </li>{" "}
            <li>
              Highlighting Innovative Ideas: Conduct an Innovative Idea
              Exhibition focused on Smart Cities, allowing participants to
              present and explore visionary concepts that have the potential to
              shape the future of urban living.
            </li>{" "}
            <li>
              {" "}
              Showcasing Technological Solutions: Feature Innovative Products
              Stalls centered around Smart Cities, providing a space for
              participants to display cutting-edge technologies and solutions
              designed for urban environments.
            </li>
          </ul>
          <ul>
            <li>
              {" "}
              Showcasing Innovations: Provide a prominent platform for students,
              innovators, and entrepreneurs to showcase their pioneering
              projects and innovations related to Smart Cities.
            </li>
            <li>
              Knowledge Exchange through Expert Talks: Facilitate
              knowledge-sharing by organizing Expert Talks where industry
              leaders, experts, and thought influencers discuss emerging trends
              and advancements in Smart Cities.
            </li>
            <li>
              {" "}
              Fostering Entrepreneurship: Inspire and nurture entrepreneurship
              by hosting a Pitching competition, encouraging participants to
              present innovative business ideas that contribute to the
              development of Smart Cities.
            </li>{" "}
            <li>
              Highlighting Innovative Ideas: Conduct an Innovative Idea
              Exhibition focused on Smart Cities, allowing participants to
              present and explore visionary concepts that have the potential to
              shape the future of urban living.
            </li>{" "}
            <li>
              {" "}
              Showcasing Technological Solutions: Feature Innovative Products
              Stalls centered around Smart Cities, providing a space for
              participants to display cutting-edge technologies and solutions
              designed for urban environments.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
