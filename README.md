# getirchallenge
A Backend implementation for Getir's job interview challenge. 

## Project setup
```
npm install
```

## Environment setup
Before starting the backend, create a `.env` file and fill required DB connection credentials.
```
DB_USER_NAME=
DB_PASSWORD=
DB_SERVER=
DB_NAME=
```
## How to run
```
npm run start;

npm run test;

npm run coverage;

# note that test scripts starts its own BE instance and connects it on localhost:8080 if they require a server instance.
# So, you dont need to start a BE instance manually.
```

# Design notes

## General
  * Entire project is implemented to support **asynchronous programmming** best practices.
  * Promises are widely used in order not to lock the Thread. 
  * Avoided the use of `await` keyword.
  * **Exceptions and error** cases are handled carefully. 
  * pre-commit and pre-push hooks are added to keep repository clean and robust.

## Notes about classes
* `Server.js`
  * This class is responsible for receiving HTTP requests and answering them with the data provided from Bussiness Logic classes (currently RecordManager)
  * All Server related implementations are done only in this class.
* `RecordManager.js`
  * This class is designed to implement any bussiness logic that is required to fetch and manipulate record related data.
  * This class takes `dbConnector` instance as a parameter and does not include any db specific implementations. 
  * DB specific implementations are done in DBConnector class (currently `MongooseDBConnector`). So, **changing DB technology** will not affect this class' implementation.
* `MongooseDBConnector.js`
  * This class is a an implementation of a DBConnector interface for Mongoose&MongoDB. 
  * No other classes have mongoose&MongoDB specific implementations.
* `JoiSchemaValidatorHelper.js`
  * This helper class holds the validator configurations for objects used in the project.
  * It is implemented as a helper to let it be used by various classes in future.

## Notes about tests
  * `RecordServer.spec.js`
    * This test case starts its own full feature BE instance before the start (on `beforeAll` hook). 
    * Performs HTTP post requests to the local BE.
    * It tests both success and fail cases.
  * `RecordManager.spec.js`
    * This test case initializes only `RecordManager` and `MongooseDBConnector`. 
    * It does **not** start the HTTP Server. 
    * The purpose of this test case is to test only bussiness logic layer (`RecordManager.js`)
  * `RecordManagerWithNoDB.spec.js`
    * This test case initializes only `RecordManager` and `MongooseDBConnector`. 
    * But, MongooseDBConnector.connect method is intentionally **not** called.
    * The purpose of this test case is to test if the BL layer (`RecordManager`) can handle errors when DB connection is not successfull.

## Libraries used
* Joi lib is used for scheme validation.
* Mongoose used as DB object modeling.
* Jest is used for testing framework as requested in challenge.
* Express is used for Http server.
* Eslint is used for syntax and code style checks.

## Further Improvement Ideas
* A **log** manager should be integrated.
* Express **routers** should be used if there will be many endpoints.
* Minimum **coverage** checks may be added to pre-commit hooks.
* An **authentication** mechanism should be implemented to protect endpoints.
* An API documentation may be provided by tools like swagger.io
* A CI/CD pipeline integration should be activeated on GitHub to run test on branches.
