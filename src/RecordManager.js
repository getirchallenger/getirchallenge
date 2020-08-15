const RESPONSE_CODES = require("./RESPONSE_CODES.json");

module.exports = function (_dbConnector) {

    let dbConnector = _dbConnector;

    function main() { }

    this.getData = function (startDate, endDate, minCount, maxCount) {
        return _dbConnector.getData(startDate, endDate, minCount, maxCount).then((records, code, msg) => {

        });
    };

    main();
};