const db = require("../database");
const { decryptData } = require("../utils/transformData");

module.exports = {
    readData: function (callback) {
        const sql = "SELECT * FROM crud";

        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            return callback(data);
        });
    },

    searchData: function (sQuery, callback) {
        let dbData = [];
        const sql = "SELECT * FROM crud";

        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            dbData = decryptData(data);

            const lcQuery = sQuery.trim().toLowerCase();
            const filteredData = dbData.filter((item) => {
                return (
                    item.full_name
                        .toLowerCase()
                        .includes(lcQuery.toLowerCase()) ||
                    item.email_address
                        .toLowerCase()
                        .includes(lcQuery.toLowerCase()) ||
                    item.city.toLowerCase().includes(lcQuery.toLowerCase()) ||
                    item.country.toLowerCase().includes(lcQuery.toLowerCase())
                );
            });

            return callback(filteredData);
        });
    },
};
