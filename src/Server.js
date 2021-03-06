/**
 * This class includes the required implementations for an HTTP server. 
 * 
 * This class is responsible for receiving HTTP requests and answering them
 * with the data provided from Bussiness Logic classes (currently RecordManager)
 *  
 */

const express = require("express");
const bodyParser = require('body-parser');
const RESPONSE_CODES = require("./RESPONSE_CODES.json");

const PORT = process.env.PORT || 8080;

module.exports = function (_recordManager) {

  let http;
  let app;
  let serverHandle;
  let recordManager = _recordManager;

  function main() {
    // console.log("⚙️  Initializing HTTPServer");
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

  function registerEndPoints() {
    app.post("/getData", handleGetData.bind(this));
  }

  this.listen = function () {
    return new Promise(resolve => {
      serverHandle = http.listen(PORT, function () {
        // console.log("✅ HTTPServer initialized");
        resolve(serverHandle);
      });
    });
  }

  function handleGetData(req, res) {
    recordManager.getData(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount)
      .then((records) => {

        res.send({
          records,
          code: RESPONSE_CODES.SUCCESS.code,
          msg: RESPONSE_CODES.SUCCESS.msg
        });

      }).catch(error => {

        error = error || RESPONSE_CODES.UNKNOWN_ERROR;

        res.send({
          records: [],
          code: error.code,
          msg: error.msg
        });
      });
  }

  main();
};