const { db } = require('../config');
module.exports = function () {
    const dbName = db.dbName;
    const mongoose = require('mongoose');
    mongoose.connect(db.url, { useMongoClient: true }, function (err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to database successfully!');
        }
    });
}