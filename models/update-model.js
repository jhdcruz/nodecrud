const db = require("../database");

module.exports = {
    editData: function (editId, callback) {
        const sql = `SELECT * FROM crud WHERE id=${editId}`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },

    updateData: function (inputData, updateId, callback) {
        const sql = `UPDATE crud SET ? WHERE id= ?`;
        db.query(sql, [inputData, updateId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
