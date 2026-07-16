import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UrlContext } from "../../Context/UrlContext";
const Redirect = () => {
  const { redirect } = useContext(UrlContext);
  const { id } = useParams();

  useEffect(() => {
    redirect(id);
  }, []);

  return (
    <div className="bg-dark min-vh-100">
      <h1 className="text-light text-center p-5">Redirecting...</h1>
      <div className="d-flex justify-content-center mt-5">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#ffffff"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default Redirect;
