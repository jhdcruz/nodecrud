const db = require("../database");

module.exports = {
    readData: function (callback) {
        const sql = "SELECT * FROM crud";

        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            return callback(data);
        });
    },
};
