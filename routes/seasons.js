const express = require("express");
const router = express.Router();

router.get("/seasons", (req, res) => {
  db.collection("matches").distinct("season", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/seasons/:season", (req, res) => {
  const season = req.params.season;

  db.collection("matches")
    .find({ season: season })
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get("/seasons/graph/:season", (req, res) => {
  const season = req.params.season;
  const data = {
    labels: null,
    series: [[], []]
  };
  db.collection("matches")
    .find({ season: season })
    .toArray((err, result) => {
      if (err) throw err;

      let teams = result.map(val => {
        return val.team1 && val.team2;
      });
      data.labels = [...new Set(teams)];

      result.map(val => {
        let index1 = data.labels.indexOf(val.team1);
        let index2 = data.labels.indexOf(val.team2);
        let winnerIndex = data.labels.indexOf(val.winner);
        if (data.series[0][index1] >= 0) {
          data.series[0][index1] = data.series[0][index1] + 1;
        } else {
          data.series[0][index1] = data.series[0][index1] = 0;
        }
        if (data.series[0][index2] >= 0) {
          data.series[0][index2] = data.series[0][index2] + 1;
        } else {
          data.series[0][index2] = data.series[0][index2] = 0;
        }

        if (data.series[1][winnerIndex] >= 0) {
          data.series[1][winnerIndex] = data.series[1][winnerIndex] + 1;
        } else {
          data.series[1][winnerIndex] = 0;
        }
      });

      const response = data.labels.map((team, index) => {
        return {
          name: team,
          wins: data.series[1][index],
          played: data.series[0][index]
        };
      });

      res.json(response);
    });
});

module.exports = router;
