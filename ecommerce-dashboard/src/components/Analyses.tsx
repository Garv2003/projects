import React from "react";

const Analyses = () => {
  return (
    <div className="analyse">
      <div className="sales">
        <div className="status">
          <div className="info">
            <h3>Total Sales</h3>
            <h1>$65,024</h1>
          </div>
          <div className="progresss">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="percentage">
              <p>+81%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="visits">
        <div className="status">
          <div className="info">
            <h3>Site Visit</h3>
            <h1>24,981</h1>
          </div>
          <div className="progresss">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="percentage">
              <p>-48%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="searches">
        <div className="status">
          <div className="info">
            <h3>Searches</h3>
            <h1>14,147</h1>
          </div>
          <div className="progresss">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="percentage">
              <p>+21%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyses;
