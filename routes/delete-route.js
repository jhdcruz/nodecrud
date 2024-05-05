const express = require("express");
const deleteController = require("../controllers/delete-controller");
const router = express.Router();
// to delete data
router.get("/delete/:id", deleteController.deleteData);
module.exports = router;
