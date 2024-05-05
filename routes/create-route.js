const express = require("express");
const createController = require("../controllers/create-controller");
const router = express.Router();
// to create data
router.post("/create", createController.createData);
module.exports = router;
