const express = require("express");
const router = express.Router();

router.get("/teams", (req, res) => {
  db.collection("matches").distinct("team1", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/teams/:team", (req, res) => {
  const team = req.params.team;
  let tossWins = 0,
    matchWins = 0,
    seasons = [],
    matches = {};
  db.collection("matches")
    .find({ $or: [{ team1: req.params.team }, { team2: req.params.team }] })
    .toArray((err, data) => {
      if (err) throw err;
      data.map(match => {
        if (match.toss_winner === team) tossWins = tossWins + 1;
        if (match.winner === team) matchWins = matchWins + 1;
        if (!seasons.includes(match.season)) seasons.push(match.season);
        if (!matches[match.date]) {
          let flag = match.winner === team ? true : false;
          matches[match.date] = {
            team1: match.team1,
            team2: match.team2,
            won: flag,
            id : match.id
          };
        }
      });
      res.json({
        team,
        tossWins,
        matchWins,
        seasons,
        matches
      });
    });
});
module.exports = router;
