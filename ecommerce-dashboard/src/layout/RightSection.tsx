"use client";
import React from "react";
import Image from "next/image";
import Plus from "@/assets/images/plus.png";
import Profile1 from "@/assets/images/profile-1.jpg";
import Reminder from "@/components/Reminder";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkTheme } from "@/store/slices/DarkThemeSlice";
import { RootState } from "@/store/store";

const RightSection = () => {
  const isDarkMode = useSelector((state: RootState) => state.darkTheme.value);
  const dispatch = useDispatch();

  return (
    <div className="right-section">
      <div className="nav">
        <button
          id="menu-btn"
          onClick={() => {
            document.querySelector("aside")?.classList.add("show");
          }}
        >
          <span className="material-icons-sharp"> menu </span>
        </button>
        <div className="dark-mode">
          <span
            className={`material-icons-sharp ${isDarkMode ? "" : "active"}`}
            onClick={() => {
              dispatch(toggleDarkTheme());
            }}
          >
            light_mode{" "}
          </span>
          <span
            className={`material-icons-sharp ${isDarkMode ? "active" : ""}`}
            onClick={() => {
              dispatch(toggleDarkTheme());
            }}
          >
            dark_mode{" "}
          </span>
        </div>

        <div className="profile">
          <div className="info">
            <p>
              Hey, <b>Reza</b>
            </p>
            <small className="text-muted">Admin</small>
          </div>
          <div className="profile-photo">
            <Image src={Profile1} alt="" width="100" height="100" />
          </div>
        </div>
      </div>
      <div className="user-profile">
        <div className="logo">
          <Image src={Plus} alt="" width="100" height="100" />
          <h2>Garv Aggarwal</h2>
          <p>Fullstack Web Developer</p>
        </div>
      </div>
      <Reminder />
    </div>
  );
};

export default RightSection;
