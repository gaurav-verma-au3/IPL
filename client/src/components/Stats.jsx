import React, { useState, useEffect } from "react";
import { API_ORIGIN } from "../config";
import Animation from "./Animation";
import Chart from "./Chart";

const Stats = props => {
  const [seasons, setSeasons] = useState(null);
  const [visualData, setVisualData] = useState(null);
  const [error, setError] = useState(null);

  const fetchSeasonData = e => {
    setVisualData("loading");
    fetch(`${API_ORIGIN}/seasons/graph/${e.target.value}`)
      .then(response => response.json())
      .then(data => {
        setVisualData(data);
      })
      .catch(error => setError("Failed to fetch data"));
  };

  useEffect(() => {
    fetch(`${API_ORIGIN}/seasons`)
      .then(response => response.json())
      .then(data => {
        setSeasons(data);
      })
      .catch(error => setError("Failed to fetch data"));
  }, []);
  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-12 col-sm-12 min-100 p-5  ">
          <div className="row">
            <div className="col-6">
              <h2 className="">Statistics</h2>
            </div>
            <div className="col-6">
              <div class="form-group d-flex align-items-center">
                <label className="mr-3 m-0">Select Season: </label>
                <select class="form-control w-50" onChange={e => fetchSeasonData(e)}>
                  <option selected>- - -</option>
                  {seasons
                    ? seasons.map((season, index) => {
                        return <option key={index + 7438}>{season}</option>;
                      })
                    : null}
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              {visualData && visualData !== "loading" ? (
                <Chart data={visualData} />
              ) : visualData === "loading" ? (
                <Animation />
              ) : (
                <h6 className="mt-5">Please select a season from above Dropdown ...</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;