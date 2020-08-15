const RESPONSE_CODES = require("./RESPONSE_CODES.json");
const validators = require("./JoiSchemaValidatorHelper");

module.exports = function (_dbConnector) {

    let dbConnector = _dbConnector;

    function main() { }

    this.getData = function (startDate, endDate, minCount, maxCount) {
        if (!validators.isValidGetDataParams({ startDate, endDate, minCount, maxCount })) {
            return Promise.reject(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS)
        }

        return dbConnector.getFilteredRecords(startDate, endDate, minCount, maxCount);
    };

    main();
};