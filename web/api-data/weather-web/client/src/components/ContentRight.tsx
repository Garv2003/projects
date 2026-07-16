import Footer from "./Footer";
import logo19 from "../assests/images/weathericon/direction.png";
import MapBox from "./MapBox";
import {
  Data,
  Data1,
  Icon,
  QualitativeName,
  QualitativeBg,
} from "../utils/utils";

const ContentRight = ({
  data,
  icon,
  data1,
}: {
  data: Data;
  icon: Icon;
  data1: Data1;
}) => {
  return (
    <div className="content-right">
      <section
        className="section highlights"
        aria-labelledby="highlights-label"
        data-highlights
      >
        <h2 className="title-2" id="highlights-label">
          Todays Highlights
        </h2>
        <div className="highlight-list">
          <div className="card card-sm highlight-card one">
            <h3 className="title-3">Air Quality Index</h3>
            <div className="wrapper">
              <span className="m-icon">air</span>
              <ul className="card-list">
                <li className="card-item">
                  <p className="label-1">CO</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.co)}
                  </p>
                </li>
                <li className="card-item">
                  <p className="label-1">NH3</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.nh3)}
                  </p>
                </li>
                <li className="card-item">
                  <p className="label-1">NO</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.no)}
                  </p>
                </li>

                <li className="card-item">
                  <p className="label-1">NO2</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.no2)}
                  </p>
                </li>

                <li className="card-item">
                  <p className="label-1">O3</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.o3)}
                  </p>
                </li>

                <li className="card-item">
                  <p className="label-1">SO2</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.so2)}
                  </p>
                </li>

                <li className="card-item">
                  <p className="label-1">PM2.5</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.pm2_5)}
                  </p>
                </li>

                <li className="card-item">
                  <p className="label-1">PM10</p>
                  <p className="title-1">
                    {parseInt(data1?.list[0]?.components?.pm10)}
                  </p>
                </li>
              </ul>
            </div>

            <span
              className="badge aqi-1 label-1"
              title="aqi message"
              style={{
                backgroundColor: QualitativeBg(data1?.list[0]?.main?.aqi),
              }}
            >
              {QualitativeName(data1?.list[0]?.main?.aqi)}
            </span>
          </div>

          <div className="card card-sm highlight-card two">
            <h3 className="title-3">Sunrise & Sunset</h3>
            <div className="card-list">
              <div className="card-item">
                <span className="m-icon">clear_day</span>
                <div>
                  <p className="label-1">Sunrise</p>
                  <p className="title-1">
                    {new Date(data?.city?.sunrise * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="card-item">
                <span className="m-icon">clear_night</span>
                <div>
                  <p className="label-1">Sunset</p>
                  <p className="title-1">
                    {new Date(data?.city?.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-sm highlight-card">
            <h3 className="title-3">Humidity</h3>
            <div className="wrapper">
              <span className="m-icon">humidity_percentage</span>
              <p className="title-1">
                {data?.list[0]?.main?.humidity}
                <sub>%</sub>
              </p>
            </div>
          </div>
          <div className="card card-sm highlight-card">
            <h3 className="title-3">Pressure</h3>
            <div className="wrapper">
              <span className="m-icon">airwave</span>
              <p className="title-1">
                {data?.list[0]?.main?.pressure}
                <sub>hPa</sub>
              </p>
            </div>
          </div>
          <div className="card card-sm highlight-card">
            <h3 className="title-3">visibility</h3>
            <div className="wrapper">
              <span className="m-icon">visibility</span>
              <p className="title-1">
                {data?.list[0]?.visibility}
                <sub>km</sub>
              </p>
            </div>
          </div>
          <div className="card card-sm highlight-card">
            <h3 className="title-3">Feel Like</h3>
            <div className="wrapper">
              <span className="m-icon">thermostat</span>
              <p className="title-1">
                {Math.round(data?.list[0]?.main?.feels_like - 273.15)}
                &deg; <sub>c</sub>
              </p>
            </div>
          </div>
        </div>
      </section>
      <MapBox data={data} />
      <section
        className="section hourly-forecast"
        aria-label="hourly forecast"
        data-hourly-forecast
      >
        <h2 className="title-2">Today at</h2>
        <div className="slider-container">
          <ul className="slider-list" data-temp>
            {data?.list?.map((item: Data["list"][0]) => {
              return (
                <li key={item.dt} className="slider-item">
                  <div className="card card-sm slider-card">
                    <p className="body-3">
                      {new Date(item?.dt_txt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <img
                      src={icon[item?.weather[0]?.icon]}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      className="weather-icon"
                      title=""
                    />
                    <p className="body-3">
                      {Math.round(item?.main?.temp - 273.15)}&deg;
                      <sup>c</sup>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="slider-list" data-wind>
            {data?.list?.map((item) => {
              return (
                <li key={item.dt} className="slider-item">
                  <div className="card card-sm slider-card">
                    <p className="body-3">
                      {new Date(item?.dt_txt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <img
                      src={logo19}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      className="weather-icon"
                      title=""
                    />
                    <p className="body-3">{item?.wind?.speed} m/s</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </section>
    </div>
  );
};

export default ContentRight;
