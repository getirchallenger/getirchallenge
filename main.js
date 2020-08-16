/**
 * This class is responsible for initializing systems like DBConnector
 * bussiness logic layer and HTTPServer.
 */
const MongooseDBConnector = require("./src/MongooseDBConnector");
const RecordManager = require("./src/RecordManager");
const Server = require("./src/Server");
const dotenv = require("dotenv");

let serverInstance;
let mongooseDBConnector;
let recordManager;

function main() {
  dotenv.config();
  
  mongooseDBConnector = new MongooseDBConnector();

  mongooseDBConnector.connectToDB().then(() => {
    recordManager = new RecordManager(mongooseDBConnector);
    serverInstance = new Server(recordManager);
    return serverInstance.listen();
  });
}

main();