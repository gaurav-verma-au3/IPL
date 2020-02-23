const express = require("express");
const router = express.Router();

router.get("/search/:year/:query", (req, res) => {
  const query = req.params.query;
  const year = req.params.year;
  const response = [];
  db.collection("matches")
    .find({ team1: { $regex: `${query}`, $options: "$i" } })
    .toArray((err, result) => {
      if (year === "All") {
        res.send(result);
      } else {
        result.map(val => {
          if (val.season == year) {
            response.push(val);
          }
        });
        res.send(response);
      }
    });
});

module.exports = router;
