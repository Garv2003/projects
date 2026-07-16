import React, { useState, useContext } from "react";
import "./ShortUrlBox.css";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { UrlContext } from "../../Context/UrlContext";
const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;

const ShortUrlBox = () => {
  const { clicks, shorturl, url, setDisplay, setUrl, copy, downloadQR } =
    useContext(UrlContext);
  const [show, setShow] = useState(true);

  function resolveDataUrl() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const img = document.querySelector("#qrcode");
        if (img.currentSrc) {
          resolve(img.currentSrc);
          return;
        }
        const canvas = document.querySelector("canvas");
        resolve(canvas.toDataURL());
      }, 50);
    });
  }

  async function handleShare() {
    setTimeout(async () => {
      try {
        const base64url = await resolveDataUrl();
        const blob = await (await fetch(base64url)).blob();
        const file = new File([blob], "QRCode.png", {
          type: blob.type,
        });
        await navigator.share({
          files: [file],
          title: "QR Code for " + url,
          text: `Scan this QR Code to visit ${url} and Your Shortened Url is ${
            CLIENT_URL + shorturl
          } Shorten your URL at ${CLIENT_URL}`,
          url: CLIENT_URL + shorturl,
        });
      } catch (error) {
        alert("Your browser doesn't support sharing.");
      }
    }, 100);
  }

  return (
    <div className="container-sm bg-dark text-light mt-5 mb-5 rounded-4">
      <div className="text-center shadow p-4 rounded-5">
        <button
          onClick={() => setShow(true)}
          className={`shorturl text-light ${show ? "slider" : ""}`}
        >
          URL
        </button>
        <button
          onClick={() => setShow(false)}
          className={`qr_code text-light ${show ? "" : "slider"}`}
        >
          QR CODE
        </button>
      </div>
      {show ? (
        <div className="p-4" id="cont1">
          <div className="form">
            <input
              type="text"
              className="forminput border-0  ps-3 mt-3 text-center"
              id="copyinput"
              value={CLIENT_URL + shorturl}
              readOnly={true}
            />
            <button
              className="formbtn border-0 bg-primary text-light mt-3"
              id="btn"
              onClick={copy}
            >
              Copy URL
            </button>
          </div>
          <div>
            <div className="p-2">
              <div>Full URL</div>
              <div className="text-truncate" style={{ maxWidth: "600px" }}>
                <Link to={url} target="_blank">
                  {url}
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <div className="p-2">Total of clicks of Your shortened URL</div>
              <span className="text-primary p-2">{clicks}</span>
            </div>
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                setDisplay(true);
                setUrl("");
              }}
            >
              Shorten another URL
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 row">
          <div className="qr-code col-md-5 row">
            <QRCode
              id="qrcode"
              value={CLIENT_URL + shorturl}
              style={{ margin: "auto", width: "85%", height: "100%" }}
              level={"H"}
              includeMargin={true}
            />
            <div className="d-flex justify-content-center mt-2">
              <Link
                onClick={() => downloadQR(shorturl)}
                className="btn btn-primary"
                style={({ textDecoration: "none" }, { fontSize: "0.8rem" })}
              >
                {" "}
                Download
              </Link>
              <button
                onClick={() => handleShare()}
                className="btn btn-primary ms-2 "
                style={{ fontSize: "0.8rem" }}
              >
                {" "}
                Share
              </button>
            </div>
          </div>
          <div className="col-md-7 p-2 ">
            <div className="p-2">
              <div className="text-start">Full URL</div>
              <div className="text-truncate" style={{ maxWidth: "600px" }}>
                <Link to={url} target="_blank">
                  {url}
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <div className="p-2">Total of clicks of Your shortened URL</div>
              <span className="text-primary p-2">{clicks}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => {
                setDisplay(true);
                setUrl("");
              }}
            >
              Shorten another URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortUrlBox;
