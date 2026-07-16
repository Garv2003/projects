import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import { icon } from "../../utils/utils";
import {
  useEffect,
  useState,
  // useRef
} from "react";
import Footer from "../../components/Footer";
import { CgProfile } from "react-icons/cg";
import MapBox from "../../components/MapBox";
import Cards from "../../components/Cards";
import logo from "../../assests/images/logo-2.png";
import "./Profile.css";
import useWeather from "../../Hooks/useWeather";
import { formatShortDate, formatDate } from "../../utils/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Data } from "../../utils/utils";
import useSWR from "swr";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Profile = () => {
  const navigate = useNavigate({ from: "/login" });
  const [loading, setLoading] = useState(false);

  // const inputRef = useRef<HTMLInputElement>(null);

  if (!localStorage.getItem("token")) {
    navigate({ to: "/login" });
  }

  const { data, isLoading, error, setUrl, geoLocation, isLoading1 } =
    useWeather();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    mutate,
  } = useSWR(
    import.meta.env.VITE_SERVER_URL + "/api/user",
    async (url) => {
      try {
        const response = await axios(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
      } catch (err) {
        throw new Error("Something went wrong");
      }
    },
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  useEffect(() => {
    if (userError) {
      localStorage.removeItem("token");
      navigate({ to: "/login" });
    }
  }, [userError]);

  if (userLoading || isLoading || isLoading1) return <Loader />;

  if (error) return <NotFound setUrl={setUrl} city={"New Delhi"} />;

  const handleRemove = async (city: string) => {
    const newPlaces = user?.places.filter((place: { name: string }) => {
      return place.name !== city;
    });
    mutate({ ...user, places: newPlaces });
  };

  const handleAdd = async () => {
    const city = prompt("Enter City Name");
    if (city) {
      setLoading(true);
      try {
        await axios.post(
          import.meta.env.VITE_SERVER_URL + "/api/addplace",
          {
            city,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        mutate({ ...user, places: [...user.places, { name: city }] });
        setLoading(false);
        toast.success("City added to favorite", {
          position: "bottom-right",
          theme: "colored",
        });
      } catch (err: any) {
        setLoading(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
  };

  // const AddProfile = () => {
  //   if (inputRef.current?.files) {
  //     const formData = new FormData();
  //     formData.append("profileimg", inputRef.current.files[0]);
  //     axios
  //       .post(import.meta.env.VITE_SERVER_URL + "/api/profileimg", formData, {
  //         headers: {
  //           contentType: "multipart/form-data",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((response) => {
  //         toast.success("Profile Updated", {
  //           position: "bottom-right",
  //           theme: "colored",
  //         });
  //         mutate({ ...user, profile: response.data.profile });
  //       })
  //       .catch((err) => {
  //         toast.error("Something went wrong", {
  //           position: "bottom-right",
  //           theme: "colored",
  //         });
  //       });
  //   }
  // };

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
          <div className="header-actions">
            <div
              className="btn-primary has-state disabled"
              data-current-location-btn
              style={{ cursor: "pointer" }}
              onClick={geoLocation}
            >
              <span className="m-icon">my_location</span>
              <span className="span">Current Location</span>
            </div>
            <div className="header-actions">
              <div
                className="btn-primary has-state disabled"
                data-current-location-btn
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                <span className="m-icon">person</span>
                <span className="span">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <article className="container">
          <div className="content-left">
            <section
              className="section current-weather"
              aria-label="current weather"
              data-current-weather
            >
              <div className="card card-lg current-weather-card">
                <h2 className="title-2 card-title">Profile</h2>
                <div className="weapper">
                  <p
                    className="heading"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    {user?.username}
                  </p>
                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={AddProfile}
                    style={{ display: "none" }}
                    name="profileimg"
                    id="profile"
                    ref={inputRef}
                  /> */}
                  <CgProfile
                    size={100}
                    style={{ marginLeft: "auto", cursor: "pointer" }}
                    // onClick={() => inputRef.current?.click()}
                  />
                </div>
                <p className="body-3">{user?.fullname}</p>
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
                5 Days Forecast of your location
              </h2>
              <div className="card card-lg forecast-card">
                <ul>
                  {data?.list
                    .filter((_: any, index: number) => index % 8 === 0)
                    .map((item: Data["list"][0]) => {
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
                          <p className="label-1">
                            {formatShortDate(item?.dt_txt)}
                          </p>
                          <p className="label-1">
                            {new Date(item?.dt_txt)?.toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                              }
                            )}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </section>
          </div>
          <div className="content-right">
            <section
              className="section highlights"
              aria-labelledby="highlights-label"
              data-highlights
            >
              <h2
                className="title-2"
                id="highlights-label"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Favorite Places</div>
                <div
                  style={{
                    cursor: "pointer",
                    background: "green",
                    padding: "2px 5px",
                    borderRadius: "50%",
                    color: "white",
                  }}
                  onClick={handleAdd}
                >
                  {loading ? (
                    <TailSpin
                      color="white"
                      height={20}
                      width={20}
                      wrapperStyle={{
                        padding: "2px 0px",
                      }}
                    />
                  ) : (
                    <IoMdAdd size={30} />
                  )}
                </div>
              </h2>
              <div className="favorites">
                {user?.places.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    No Favorite Places
                  </div>
                )}
                {user?.places.map((place: { name: string }) => {
                  return (
                    <Cards
                      city={place?.name}
                      key={place?.name}
                      RemoveCity={handleRemove}
                    />
                  );
                })}
              </div>
            </section>
            <MapBox data={data} />
            <section
              className="section hourly-forecast"
              aria-label="hourly forecast"
              data-hourly-forecast
            >
              <Footer />
            </section>
          </div>
        </article>
      </main>
    </>
  );
};

export default Profile;
