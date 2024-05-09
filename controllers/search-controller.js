const readModel = require("../models/read-model");
const { decryptData } = require("../utils/transformData");

module.exports = {
    searchData: function (req, res) {
        const searchQuery = req.body.q ?? "";
        readModel.searchData(searchQuery, function (data) {
            res.render("index", {
                searchQuery: searchQuery,
                fetchData: data,
            });
        });
    },
};
