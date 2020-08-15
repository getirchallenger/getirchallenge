const express = require("express");
const bodyParser = require('body-parser');


const PORT = 8080;

module.exports = function (_recordManager) {

  let http;
  let app;
  let recordManager = _recordManager;

  function main() {
    initHttpServer();
  }

  function initHttpServer() {
    app = express();
    http = require("http").Server(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    registerEndPoints();
  }

  this.listen = function () {
    http.listen(PORT, function () {
      console.log("Server is listening on *:" + PORT);
    });
  }

  function registerEndPoints() {
    app.post("/getData", handleGetData.bind(this));
  }

  // {
  //   "startDate": "2016-01-26",
  //   "endDate": "2018-02-02",
  //   "minCount": 2700,
  //   "maxCount": 3000
  // }
  function handleGetData(req, res) {
    recordManager.getData(null, null, null, null).then((records, code, msg) => {
      res.send({ records, code, msg });
    });
  }

  main();
};