import logo20 from "../assests/images/openweather.png";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="body-3">
        Created by{" "}
        <a
          href="https://www.linkedin.com/in/garvaggarwal05/"
          title="Created by Garv Aggarwal"
        >
          Garv Aggarwal
        </a>
      </p>
      <p className="body-3">
        Powered By{" "}
        <a
          href="https://openweathermap.org/"
          title="Free OpenWeather API"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo20}
            height="30"
            width="150"
            alt="OpenWeather"
            loading="lazy"
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
