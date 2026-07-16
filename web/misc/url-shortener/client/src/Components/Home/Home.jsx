import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import InputBox from "../InputBox/InputBox";
import Table from "../Table/Table";
import Box from "../Box/Box";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ShortUrlBox from "../ShortUrlBox/ShortUrlBox";
import { ThreeCircles } from "react-loader-spinner";
import { UrlContext } from "../../Context/UrlContext";

const Home = () => {
  const { urls, loading, getUrls, display, loadingbox } =
    useContext(UrlContext);

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div className="bg-dark bg-gradient d-flex flex-column min-vh-100">
      <Navbar />
      {loadingbox ? (
        <div className="text-center mt-5">
          <div className="text-light fs-2 p-2">
            Creating a short link may take a few seconds.
          </div>
          <div className="text-light fs-2"> Please wait...</div>
          <div className="mt-5 mb-5">
            <ThreeCircles
              height="100%"
              width="20%"
              color="#ffffff"
              wrapperStyle={{ alignItems: "center", justifyContent: "center" }}
              visible={true}
              ariaLabel="three-circles-rotating"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {display ? (
        !loadingbox && (
          <div className="container">
            <InputBox />
            <SkeletonTheme baseColor="#212529" highlightColor="#605d5d">
              {loading ? (
                <Skeleton
                  height={180}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                />
              ) : (
                <Table urls={urls} />
              )}
            </SkeletonTheme>
            <Box />
          </div>
        )
      ) : (
        <ShortUrlBox />
      )}

      <Footer />
    </div>
  );
};

export default Home;
