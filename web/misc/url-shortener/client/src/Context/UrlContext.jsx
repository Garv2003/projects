import { createContext, useState } from "react";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_APP_SERVER_API;

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(true);
  const [loadingbox, setLoadingbox] = useState(false);
  const [shorturl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(0);
  const [url, setUrl] = useState("");

  const getUrls = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/url");
      setUrls(res.data.urls);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const redirect = async (id) => {
    try {
      axios.get(SERVER_URL + `/url/shorturl/${id}`).then((res) => {
        console.log(res.status == 404);
        if (res.data === null) {
          alert("Invalid URL");
          window.location.href = "/";
        } else {
          window.location.href = res.data.FullUrl;
        }
      });
    } catch (err) {
      alert("Invalid URL");
      window.location.href = "/";
    }
  };

  const handleurl = async (e) => {
    if (url.length === 0) return alert("Please enter a URL");
    if (!isValidUrl(url)) {
      setUrl("");
      return alert("Please enter a valid URL");
    }
    setLoadingbox(true);
    url.trim();
    try {
      const res = await axios.post(SERVER_URL + "/url/addurl", {
        FullUrl: url,
      });
      setUrl(res.data.FullUrl);
      setShortUrl(res.data.ShortUrl);
      setClicks(res.data.Clicks);
      setDisplay(false);
      setLoadingbox(false);
      if (!urls.some((item) => item._id === res.data._id)) {
        setUrls((prev) => [...prev, res.data]);
      }
    } catch (err) {
      setDisplay(true);
      setLoadingbox(false);
      alert("Please enter a valid URL");
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const copy = () => {
    var copyText = document.getElementById("copyinput");
    navigator.clipboard.writeText(copyText.value);
    var tooltip = document.getElementById("btn");
    tooltip.innerHTML = "URL Copied";
    setTimeout(() => {
      tooltip.innerHTML = "Copy URL";
    }, 5000);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QrCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <UrlContext.Provider
      value={{
        loading,
        setLoading,
        getUrls,
        urls,
        setUrls,
        copy,
        downloadQR,
        display,
        setDisplay,
        loadingbox,
        setLoadingbox,
        shorturl,
        setShortUrl,
        clicks,
        setClicks,
        url,
        setUrl,
        redirect,
        handleurl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};
