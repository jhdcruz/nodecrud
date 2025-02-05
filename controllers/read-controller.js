const readModel = require("../models/read-model");
const { decryptData } = require("../utils/transformData");

module.exports = {
    readData: function (req, res) {
        readModel.readData(function (data) {
            const searchQuery = "";
            const decrypted = decryptData(data);

            res.render("index", {
                searchQuery: searchQuery,
                fetchData: decrypted,
            });
        });
    },
};
