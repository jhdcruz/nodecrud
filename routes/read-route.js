const express = require("express");
const readController = require("../controllers/read-controller");
const router = express.Router();
// to display data
router.get("/read", readController.readData);
module.exports = router;
