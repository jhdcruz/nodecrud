const db = require("../database");
module.exports = {
    createData: function (inputData, callback) {
        const sql = "INSERT INTO crud SET ?";

        db.query(sql, inputData, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
