const express = require("express");


const PORT = 8080;

module.exports = function () {

  let http;
  let app;

  function main() {
    initHttpServer();
  }

  this.listen = function () {
    http.listen(PORT, function () {
      console.log("Server is listening on *:" + PORT);
    });
  }

  function initHttpServer() {
    app = express();
    http = require("http").Server(app);

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

  function handleGetData(req, res) {
    console.log("HandleGetData called");
    res.send({ result: "OK" });
  }

  main();
};