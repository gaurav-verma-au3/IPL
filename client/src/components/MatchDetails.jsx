import React, { useState, useEffect } from "react";
import { API_ORIGIN } from "../config";
import Animation from "./Animation";

const MatchDetails = props => {
  const matchId = props.match.params.matchId;
  const [matchDeatils, setMatchDetails] = useState(null);
  const [match, setMatch] = useState(null);

  const url = `${API_ORIGIN}/match/${matchId}`;
  const getTotal = (matchDetails, team) => {
    let sum = 0;

    matchDetails.forEach(v => {
      if (v.batting_team === team) {
        sum = sum + parseInt(v.total_runs);
      }
    });

    return sum;
  };

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMatch(data[0][0]);
        setMatchDetails(data[1]);
      })
      .catch(error => console.log(error));
  }, [url]);

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-md-12 col-sm-12 min-100 p-5 ">
            {matchDeatils ? (
              <>
                <h2>
                  {matchDeatils[0].batting_team} vs{" "}
                  {matchDeatils[0].bowling_team}
                </h2>
                <hr />
                <div className="row">
                  <div className="col-md-4 col-sm-12 p-3 d-flex align-items-center justify-content-center">
                    <h5 className="text-center m-0 p-0">
                      {match.winner} Win by{" "}
                      {parseInt(match.win_by_runs)
                        ? `${match.win_by_runs} Run(s)`
                        : `${match.win_by_wickets} wicket(s)`}
                    </h5>
                  </div>
                  <div className="col-md-4 col-sm-12 p-3 d-flex align-items-center justify-content-center">
                    <h5 className="text-center m-0 p-0">
                      Man of the match <br /> {match.player_of_match}
                    </h5>
                  </div>
                  <div className="col-md-4 col-sm-12 p-3 ">
                    <>
                      <h4 className="m-0 p-0 text-center">Total Runs</h4>
                      <h6 className="text-center m-0 p-0">
                        {match.team1} : {getTotal(matchDeatils, match.team1)}
                      </h6>
                      <h6 className="text-center m-0 p-0">
                        {match.team2} : {getTotal(matchDeatils, match.team2)}
                      </h6>
                    </>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12">
                    <h6 className="m-0">
                      {match.toss_winner} Won the Toss and choose to{" "}
                      {match.toss_decision}
                    </h6>
                  </div>
                </div>
                <hr />
                Ball by Ball :
                <hr />
                <div className="row">
                  {matchDeatils.map((ball, index) => {
                    return (
                      <div
                        className="col-md-8 col-sm-12 alert alert-secondary"
                        key={index + 45326}
                      >
                        <p>
                          {`[Inning :  ${ball.inning}] ${ball.over}.${ball.ball}`}{" "}
                          {ball.bowler} to {ball.batsman}
                          {", "}
                          {parseInt(ball.wide_runs) ? `wide ball,` : null}{" "}
                          {parseInt(ball.legbye_runs)
                            ? `${ball.legbye_runs} run(s) from leg by,`
                            : null}{" "}
                          {ball.player_dismissed.length > 0
                            ? `${ball.player_dismissed} ${
                                ball.dismissal_kind
                              } by ${
                                ball.fielder.length > 0
                                  ? `${ball.fielder}`
                                  : `${ball.bowler}`
                              },`
                            : null}{" "}
                          {ball.total_runs} run(s) from the ball.
                        </p>
                      </div>
                    );
                  })}
                </div>
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

export default MatchDetails;
