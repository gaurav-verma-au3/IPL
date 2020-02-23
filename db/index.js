let MongoClient = require("mongodb").MongoClient;
const csv = require("csvtojson");
const filePath = "routes/deliveries.csv";
require("dotenv").config();

let url = process.env.MONGO_STRING;
const DbName = "interviewPrep";

module.exports = connectMongo = app => {
  app.locals.db;
  //connecting to DataBase
  MongoClient.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function(err, client) {
      if (err) throw err;
      console.log("DB connected");
      db = client.db(DbName);
      // csv()
      //   .fromFile(filePath)
      //   .then(jsonObj => {
      //     const finalArr = jsonObj.filter(item => item.id !== "id");
      //     db.collection("deliveries").insertMany(finalArr, (err, res) => {
      //       if (err) throw err;
      //       console.log(res);
      //       console.log("Uploading");
      //     });
      //   });
    }
  );

  //importing ObjectId
  app.locals.ObjectId;
  ObjectId = require("mongodb").ObjectID;
};
