const Server = require("./Server");

let serverInstance;

function main() {
    serverInstance = new Server();
    serverInstance.listen();
}

main();