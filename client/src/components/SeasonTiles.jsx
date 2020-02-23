import React from "react";
import { Link } from "react-router-dom";
const SeasonTiles = ({ itemsToShow }) => {
  return itemsToShow.map((match, index) => {
    return (
      <div
        key={index + 9878}
        className="col-md-6 col-sm-12 shadow-sm shadow  py-4 "
      >
        <p className=" font-weight-bold text-center">
          <Link className="text-center" to={`/match/${match.id}`}>
            {match.team1} vs {match.team2}
          </Link>
          <br />
          Venue : {match.venue}, {match.city} @ {match.date}
        </p>
        <p className="font-weight-bold text-center">
          <Link
            className="text-success text-center"
            to={`/team/${match.winner}`}
          >
            {match.winner}
          </Link>{" "}
          Won by {match.win_by_runs} Runs & {match.win_by_wickets} wickets
        </p>

        <p className="font-weight-bold text-center">
          Man Of the Match :{" "}
          <Link
            className="text-success text-center"
            to={`/player/${match.player_of_match}`}
          >
            {match.player_of_match}
          </Link>
        </p>
        <p className="font-weight-bold text-center">
          1st Umpire : {match.umpire1}, 2nd Umpire : {match.umpire2}, 3rd Umpire
          : {match.umpire3}
        </p>
      </div>
    );
  });
};

export default SeasonTiles;
