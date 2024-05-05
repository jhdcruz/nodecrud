const express = require("express");
const updateController = require("../controllers/update-controller");
const router = express.Router();
// to edit data
router.get("/edit/:id", updateController.editData);
// to update data
router.post("/update/:id", updateController.updateData);
module.exports = router;
