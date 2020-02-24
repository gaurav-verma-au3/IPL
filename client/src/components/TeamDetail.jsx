import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ORIGIN } from "../config";
import Animation from "./Animation";
import TeamDetailTile from "./TeamDetailTile";
import Pagination from "./Pagination";

const TeamDetail = props => {
  const uriPath = encodeURIComponent(props.match.params.team);
  const [teamDetails, setTeamDetails] = useState(null);
  useEffect(() => {
    let url = `${API_ORIGIN}/teams/${uriPath}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setTeamDetails(data);
      })
      .catch(error => console.log(error));
  }, [uriPath]);

  //pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const itemsToshow = teamDetails
    ? Object.keys(teamDetails.matches).slice(firstIndex, lastIndex)
    : [];

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-md-12 col-sm-12 min-100 p-5 ">
            {teamDetails ? (
              <>
                <h2 className="mt-5">{teamDetails.team}</h2>
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="alert alert-info">
                      <strong>
                        Matches Played :{" "}
                        {Object.keys(teamDetails.matches).length}
                      </strong>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="alert alert-success">
                      <strong>Tosses Won : {teamDetails.tossWins}</strong>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="alert alert-success">
                      <strong>Matches Won : {teamDetails.matchWins}</strong>
                    </div>
                  </div>
                </div>
                <hr />
                <h3>Seasons Active</h3>
                <hr />

                <div className="row">
                  {teamDetails.seasons.map((season, index) => (
                    <div className="col-3" key={index + 6764}>
                      <div
                        className="text-center alert alert-primary m-1 p-1"
                        role="alert"
                      >
                        <Link to={`/season/${season}`}>{season}</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="m-0">
                      [ Total Results = {itemsToshow.length} of{" "}
                      {Object.keys(teamDetails.matches).length} ] [ Page Number
                      = {currentPage}]
                    </h6>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <select
                      onChange={e => setItemsPerPage(e.target.value)}
                      defaultValue="10"
                      className="custom-select w-50"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <TeamDetailTile
                    teamDetails={teamDetails}
                    itemsToshow={itemsToshow}
                  />
                </div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={Object.keys(teamDetails.matches).length}
                  setCurrentPage={setCurrentPage}
                />
              </>
            ) : (
              <Animation />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
