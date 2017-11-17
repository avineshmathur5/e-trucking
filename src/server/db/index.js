const { port, host, db } = require('../config');
module.exports = function () {
    const dbName = db.dbName;
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://' + db.host + '/' + dbName, { useMongoClient: true }, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('mongodb://' + db.host + '/' + dbName);
            console.log('Connected to database successfully!');
        }
    });
}