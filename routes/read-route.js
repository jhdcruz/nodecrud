const express = require("express");
const readController = require("../controllers/read-controller");
const searchController = require("../controllers/search-controller");
const router = express.Router();

// to display data
router.get("/", readController.readData);
router.post("/search", searchController.searchData);
module.exports = router;
