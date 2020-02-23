import React from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
const SearchResults = ({ results, setVisibility }) => {
  return (
    <div className="search-container bg-dark text-light">
      <div className="container-fluid bg-dark">
        <h5
          className="text-right m-3"
          onClick={e => setVisibility(null)}
          style={{ cursor: "pointer" }}
        >
          {" "}
          Close <MdClose className="m-0 p-0" />
        </h5>

        {results.map((result, index) => {
          return (
            <Link
              type="button"
              key={index + 7833}
              className="btn btn-dark rounded-0 w-100"
            >
              <div className="row">
                <div className="col-4">{result.season}</div>
                <div className="col-4">
                  {result.team1} vs {result.team2}
                </div>
                <div className="col-4">{result.date}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
