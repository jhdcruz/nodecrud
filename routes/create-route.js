const express = require("express");
const createController = require("../controllers/create-controller");
const router = express.Router();
// to display form
router.get("/form", createController.crudForm);
// to create data
router.post("/create", createController.createData);
module.exports = router;
