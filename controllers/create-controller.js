const createModel = require("../models/create-model");
const { transformData } = require("../utils/transformData");

module.exports = {
    createData: function (req, res) {
        const inputData = transformData(req.body);

        createModel.createData(inputData, function (data) {
            res.redirect("/");
            console.log(data.affectedRows + " record created");
        });
    },
};
