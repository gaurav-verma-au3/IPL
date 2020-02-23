const express = require("express");
const router = express.Router();

router.get("/match/:matchId", (req, res) => {
  const matchId = req.params.matchId;

  db.collection("deliveries")
    .find({ match_id: matchId })
    .toArray((err, result) => {
      if (err) throw err;
      db.collection("matches")
        .find({ id: matchId })
        .toArray((err, match) => {
          if (err) throw err;
          res.json([match, result]);
        });
    });
});

module.exports = router;
