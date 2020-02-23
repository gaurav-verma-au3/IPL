import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ORIGIN } from "../config";
import Filter from "./Filter";
import Animation from "./Animation";
import Pagination from "./Pagination";
import SeasonTiles from "./SeasonTiles";
const SeasonDetail = props => {
  const season = props.match.params.season;

  const [seasonDetails, setSeasonDetails] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [error, setError] = useState(null);
  const dataToMap = filtered ? filtered : seasonDetails;

  //use effect
  useEffect(() => {
    let url = `${API_ORIGIN}/seasons/${season}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSeasonDetails(data);
      })
      .catch(error => setError("Failed to fetch data"));
  }, []);

  //pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsToshow = dataToMap ? dataToMap.slice(firstIndex, lastIndex) : [];

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <h2 className="">Season : {season}</h2>
          <hr />
          <Filter data={seasonDetails} setFiltered={setFiltered} />
          <hr />
        </div>
      </div>
      {dataToMap ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <h6 className="m-0">
                  [ Total Results = {itemsToshow.length} of {dataToMap.length} ]
                  [ Page Number = {currentPage}]
                </h6>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <select
                  onChange={e => setItemsPerPage(e.target.value)}
                  class="custom-select w-50"
                >
                  <option selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
        </>
      ) : (
        <Animation />
      )}
      {itemsToshow ? (
        <div className="row">
          <SeasonTiles itemsToShow={itemsToshow} />
        </div>
      ) : (
        <Animation />
      )}
      {dataToMap ? (
        <Pagination
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={dataToMap.length}
        />
      ) : null}
    </div>
  );
};

export default SeasonDetail;
