import React from "react";

const Box = () => {
  return (
    <div className="row mb-3 mt-4">
      <div className="col">
        <div className="card bg-dark text-light">
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">Shorten URL</h5>
            <div className="card-text">
              <div className="fw-semibold">
                URL shortener allows to create a shortened link making it easy
                to share and track clicks on your URL in real time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
