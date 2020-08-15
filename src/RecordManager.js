/**
 * This class is designed to implement any bussiness logic that is 
 * required to fetch and manipulate record related data.
 * 
 * This class takes dbConnector instance as a parameter and does not 
 * include db specific implementations. DB specific implementations
 * are done in DBConnector class (currently MongooseDBConnector). So,
 * changing DB technology will not affect this class' implementation.
 *  
 */

const RESPONSE_CODES = require("./RESPONSE_CODES.json");
const validators = require("./JoiSchemaValidatorHelper");

module.exports = function (_dbConnector) {

    let dbConnector = _dbConnector;

    function main() { }

    this.getData = function (startDate, endDate, minCount, maxCount) {
        if (!validators.isValidGetDataParams({ startDate, endDate, minCount, maxCount })) {
            return Promise.reject(RESPONSE_CODES.INVALID_REQUEST_PARAMETERS)
        }

        return dbConnector.getFilteredRecords(startDate, endDate, parseInt(minCount), parseInt(maxCount)).catch(() => {
            return Promise.reject(RESPONSE_CODES.DB_QUERY_FAILED);
        });
    };

    main();
};