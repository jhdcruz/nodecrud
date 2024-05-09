const updateModel = require("../models/update-model");
const { transformData } = require("../utils/transformData");

module.exports = {
    updateData: function (req, res) {
        const inputData = transformData(req.body);
        const updateId = req.params.id;

        updateModel.updateData(inputData, updateId, function (data) {
            res.redirect("/");
            console.log(data.affectedRows + " record(s) updated");
        });
    },
};
