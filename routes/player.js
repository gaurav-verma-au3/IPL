const router = require("express").Router();

router.get("/player/:player", (req, res) => {
  const player = req.params.player;
  let finaldata = {};
  let manOfTheMatches = 0;
  db.collection("deliveries")
    .find({ batsman: player })
    .toArray((err, result) => {
      db.collection("deleveries")
        .find({
          bowler: player
        })
        .toArray((err, data) => {
          const final = [...result, ...data];
          final.map(match => {
            if (match.player_of_match === player) manOfTheMatches += 1;
          });

          //   let matchIds = final.map(val => val.match_id);
          //   matchIds = [...new Set(matchIds)];
          //   final.map
          let count = 0;
          final.map(ball => {
            count += 1;
            console.log("iterating over finals", count);

            const {
              match_id,
              batsman,
              bowler,
              batsman_runs,
              player_dismissed
            } = ball;

            if (!finaldata[match_id]) {
              finaldata[match_id] = {
                batting_team: ball.batting_team,
                bowling_team: ball.bowling_team,
                runs: 0,
                wikets: 0,
                fours: 0,
                sixes: 0
              };
            }
            if (batsman === player) {
              finaldata[match_id].runs += parseInt(batsman_runs);
            }
            if (batsman === player && batsman_runs == 4) {
              finaldata[match_id].fours += 1;
            }
            if (batsman === player && batsman_runs == 6) {
              finaldata[match_id].sixes += 1;
            }
            if (bowler === player) {
              if (player_dismissed.length > 0) {
                finaldata[match_id].wickets += 1;
              }
            }
          });
          res.json({
            finalData: finaldata,
            manOfTheMatches: manOfTheMatches
          });
        });
    });
});

module.exports = router;
