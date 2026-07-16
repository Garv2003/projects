import React from "react";

const Footer = () => {
  return (
    <>
      <div className="container-fluid text-light text-center border-top border-primary border-5  mt-auto">
        <div className="fs-4 p-2">
          © 2023 URL SHORTENER - Tool to shorten a long link
        </div>
        <div className="d-flex justify-content-center fs-5 p-4 row ">
          <div className="fw-bolder mx-2 col-md-2">ShortURL</div>
          <div className="fw-bolder mx-2 col-md-2">URL Click Counter</div>
          <div className="fw-bolder mx-2 col-md-2">Unshorten URL </div>
          <div className="fw-bolder mx-2 col-md-2">Terms of Service </div>
          <div className="fw-bolder mx-2 col-md-2">Privacy </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
