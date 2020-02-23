import React from "react";
import { Link } from "react-router-dom";
const TeamDetailTile = ({ teamDetails, itemsToshow }) => {
  return (
    <>
      {itemsToshow.map((key, index) => {
        return (
          <div className="col-md-4 col-sm-12" key={index + 5653}>
            <div
              className={`text-center alert ${
                teamDetails.matches[key].won ? "alert-success" : "alert-danger"
              }  m-1 p-1`}
              role="alert"
            >
              <div className="w-100 row d-flex align-items-center">
                <div className="col-md-5 col-sm-12">
                  <strong>{key} :</strong>
                </div>
                <div className="col-md-7 col-sm-12">
                  <Link to={`/match/${teamDetails.matches[key].id}`}>
                    {teamDetails.matches[key].team1}
                    <br /> <strong>vs</strong>
                    <br />
                    {teamDetails.matches[key].team2}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TeamDetailTile;
