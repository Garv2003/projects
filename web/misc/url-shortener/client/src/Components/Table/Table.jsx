import React from "react";
import { Link } from "react-router-dom";
const CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;
const Table = ({ urls }) => {
  return (
    <>
      <table className="table table-md table-hover table-dark table-striped table-responsive text-center mt-5 rounded-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FULL URL</th>
            <th scope="col">SHORT URL ID</th>
            <th scope="col">CLICKS</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {urls.map((url, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td className="text-truncate" style={{ maxWidth: "100px" }}>
                {url.FullUrl}
              </td>
              <td>
                <Link
                  className="text-primary text-decoration-none"
                  to={url.ShortUrl}
                  target="_blank"
                >
                  {url.ShortUrl}
                </Link>
              </td>
              <td>
                <span>{url.Clicks}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
