import { formatDate, formatShortDate, Data, Icon } from "../utils/utils";
import { TailSpin } from "react-loader-spinner";

const ContentLeft = ({
  data,
  icon,
  handleAdd,
  loading,
}: {
  data: Data;
  icon: Icon;
  handleAdd: () => void;
  loading: boolean;
}) => {
  return (
    <div className="content-left">
      <section
        className="section current-weather"
        aria-label="current weather"
        data-current-weather
      >
        <div className="card card-lg current-weather-card">
          <h2
            className="title-2 card-title"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>Now</div>
            {loading ? (
              <TailSpin height={30} width={30} />
            ) : (
              <button
                style={{
                  backgroundColor: "green",
                  padding: "2px 8px",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}
                onClick={handleAdd}
              >
                Add
              </button>
            )}
          </h2>
          <div className="weapper">
            <p className="heading">
              {Math.round(data?.list[0]?.main?.temp - 273.15)}&deg;
              <sup>c</sup>
            </p>
            <img
              src={icon[data?.list[0]?.weather[0]?.icon]}
              alt={data?.list[0]?.weather[0]?.description}
              width="64"
              height="64"
              className="weather-icon"
            />
          </div>
          <p className="body-3">{data?.list[0]?.weather[0]?.description}</p>
          <ul className="meta-list">
            <li className="meta-item">
              <span className="m-icon">calendar_today</span>
              <p className="title-3 meta-text">
                {formatDate(data?.list[0]?.dt_txt)}
              </p>
            </li>
            <li className="meta-item">
              <span className="m-icon">location_on</span>
              <p className="title-3 meta-text">
                {data?.city?.name}, {data?.city?.country}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        className="section forecast"
        aria-label="forecast"
        data-5-day-forecast
      >
        <h2 className="title-2" id="forecast-label">
          5 Days Forecast
        </h2>
        <div className="card card-lg forecast-card">
          <ul>
            {data?.list
              .filter((_, index) => index % 8 === 0)
              .map((item) => {
                return (
                  <li key={item.dt} className="card-item">
                    <div className="icon-wrapper">
                      <img
                        src={icon[item?.weather[0]?.icon]}
                        alt={item?.weather[0]?.description}
                        width="36"
                        height="36"
                        className="weather-icon"
                      />
                      <span className="span">
                        <p className="title-2">
                          {Math.round(item?.main?.temp - 273.15)}&deg;
                          <sup>c</sup>
                        </p>
                      </span>
                    </div>
                    <p className="label-1">{formatShortDate(item?.dt_txt)}</p>
                    <p className="label-1">
                      {new Date(item?.dt_txt)?.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContentLeft;
