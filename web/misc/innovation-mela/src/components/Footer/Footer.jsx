import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="reach-us">
        <h2 className="reach-us-heading">Reach Us</h2>
        <div className="reach-us-container">
          <img src="https://tnm.mait.ac.in/images/abstractbg/Logo_white.png" alt="" />
          <div className="address">
            <h2 className="address-line">
              MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY
            </h2>
            <h3 className="address-line">
              Plot No 1 Rohini, Sector 22, PSP Area, Delhi, 110086
            </h3>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.994653666969!2d77.0639017149254!3d28.719705782383524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d068dbf44ecd7%3A0xc4ce5551f8ac8360!2sMaharaja%20Agrasen%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1679765055157!5m2!1sen!2sin"
            width="600"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map"
          ></iframe>
        </div>
      </div>
      <div className="social">
        <div className="icons">
        <a
            href="https://www.linkedin.com/school/maharaja-agrasen-institute-of-technology/"
            target="_blank"
            className="social-icon"
            style={{ color: "white" }}
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://www.facebook.com/csemait"
            target="_blank"
            className="social-icon"
            style={{ color: "blue" }}
          >
            <i className="bx bxl-meta"></i>
          </a>
          <a
            href="https://www.instagram.com/maitdelhi/"
            target="_blank"
            className="social-icon"
            style={{ color: "#ff006f" }}
          >
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            target="_blank"
            href="https://mait.ac.in/"
            className="social-icon"
            style={{ color: "lightblue" }}
          >
            <i className="bx bx-globe"></i>
          </a>
          <a
            target="_blank"
            href="https://mait.ac.in/index.php/contact-us"
            className="social-icon"
            style={{ color: "lightgrey" }}
          >
            <i className="bx bxs-envelope"></i>
          </a>


        </div>

        
      </div>
        <p className="copyright">
          © 2024 Innovation Mela | Designed with ❤️ by &nbsp;
          <a href="https://linkedin.com/in/JaiSukheja02"> 
            Jai Sukheja 
            </a> 
            &nbsp;
            & &nbsp;
            <a href="https://www.linkedin.com/in/garvaggarwal05/"> 
            Garv Aggarwal
            </a>
        </p>
    </div>
  );
};

export default Footer;
