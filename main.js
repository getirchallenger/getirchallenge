const MongooseDBConnector = require("./src/MongooseDBConnector");
const RecordManager = require("./src/RecordManager");
const Server = require("./src/Server");

let serverInstance;
let mongooseDBConnector;
let serverInstance;

function main() {
    mongooseDBConnector = new MongooseDBConnector();
    recordManager = new RecordManager(mongooseDBConnector);
    serverInstance = new Server(recordManager);

    serverInstance.listen();
}

main();