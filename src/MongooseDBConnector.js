/**
 * This class is a an implementation of a DBConnector interface for 
 * Mongoose&MongoDB. No other classes have mongoose&MongoDB specific
 * implementations.
 * 
 */
const mongoose = require('mongoose');
const RESPONSE_CODES = require("./RESPONSE_CODES.json");
const { RecordModel } = require("./models/record");


module.exports = function () {

  let DBURI;
  function main() {
    const userName = process.env.DB_USER_NAME;
    const password = process.env.DB_PASSWORD;
    const dbServer = process.env.DB_SERVER;
    const dbName = process.env.DB_NAME;
    DBURI = `mongodb+srv://${userName}:${password}@${dbServer}/${dbName}?retryWrites=true`;
  }

  this.connectToDB = function () {
    return new Promise((resolve, reject) => {
      // console.log("⚙️  Connecting to MongoDB");
      mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

      const db = mongoose.connection;
      db.on('error', (error) => {
        // console.log("❌ Could not connec to MongoDB", error);
        reject(error);
      });
      db.once('open', () => {
        // console.log("✅ Successfully connected to MongoDB");
        resolve()
      });
    });
  };

  this.disconnect = function () {
    mongoose.connection.close();
  };

  function isConnected() {
    return mongoose.connection && mongoose.connection.readyState === 1;
  }

  this.getFilteredRecords = function (startDate, endDate, minCount, maxCount) {
    if (!isConnected()) {
      return Promise.reject(RESPONSE_CODES.DB_CONNECTION_FAILED);
    }

    try {
      return RecordModel.aggregate([
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: {
              $sum: "$counts"
            }
          }
        },
        {
          $match: {
            createdAt: {
              $lte: new Date(endDate),
              $gte: new Date(startDate)
            },
            totalCount: {
              $lte: maxCount,
              $gte: minCount
            }
          }
        }
      ]);
    }
    catch (exception) {
      return Promise.reject(RESPONSE_CODES.DB_CONNECTION_FAILED);
    }
  };

  main();
};