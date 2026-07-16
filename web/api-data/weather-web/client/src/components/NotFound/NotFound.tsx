import "./NotFound.css";
const API_KEY = import.meta.env.VITE_API_KEY;

const NotFound = ({
  setUrl,
  city,
}: {
  setUrl: (url: string) => void;
  city: string;
}) => {
  return (
    <section className="error-content" data-error-content>
      <h2 className="heading">404</h2>
      <p className="body-1">Page not found!</p>
      <a
        href="#"
        className="btn-primary"
        onClick={() =>
          setUrl(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
          )
        }
        data-error-btn
      >
        <span className="span">Go Home</span>
      </a>
    </section>
  );
};

export default NotFound;
