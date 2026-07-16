import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { icon } from "../utils/utils";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import useSWR from "swr";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { toast } from "react-toastify";

const Cards = ({
  city,
  RemoveCity,
}: {
  city: string;
  RemoveCity: (city: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    if (!res) {
      throw Error("Something went wrong");
    }
    return res.data;
  };

  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`,
    fetcher
  );

  const handleRemoveCity = async (city: string) => {
    try {
      setLoading(true);
      await axios.delete(import.meta.env.VITE_SERVER_URL + "/api/deleteplace", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          city,
        },
      });
      RemoveCity(city);
      setLoading(false);
      toast.success("City removed successfully", {
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
  };

  useEffect(() => {
    if (error) {
      handleRemoveCity(city);
      toast.error("Place not found", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }, [error]);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Something went wrong
      </div>
    );

  return (
    <div className="SubContainer">
      <div className="search-box">
        <p>
          <FaLocationDot size={30} />
          <span>
            <Link to="/city/$name" params={{ name: city }}>
              {city}
            </Link>
          </span>
        </p>
        {loading ? (
          <TailSpin height={30} width={30} />
        ) : (
          <RxCross2
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleRemoveCity(city);
            }}
          />
        )}
      </div>
      <div className="weather-box fadeIn">
        <img src={icon[data?.weather[0]?.icon]} alt="weather" />
        <p className="temperature">
          {Math.round(data?.main.temp - 273.15)}&deg;<sup>c</sup>
          &deg;<sup>c</sup>
        </p>
        <p className="description">{data?.weather[0].description}</p>
      </div>

      <div
        className="weather-details fadeIn"
        style={{
          gap: "8px",
        }}
      >
        <div className="humidity">
          <span className="m-icon">humidity_percentage</span>
          <div className="text">
            <span>{data?.main.humidity}%</span>
          </div>
        </div>

        <div className="humidity">
          <span className="m-icon">visibility</span>
          <div className="text">
            <span>
              {(data?.visibility / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
              <sub>km</sub>
            </span>
          </div>
        </div>
        <div className="pressure">
          <span className="m-icon">airwave</span>
          <div className="text">
            <span>
              {" "}
              {(data?.main.pressure / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}
              <sub>hPa</sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
