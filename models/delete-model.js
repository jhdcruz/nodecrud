const db = require("../database");
module.exports = {
    deleteData: function (deleteId, callback) {
        const sql = "DELETE FROM crud WHERE id = ?";

        db.query(sql, [deleteId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
