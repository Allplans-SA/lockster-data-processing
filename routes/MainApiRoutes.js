const express = require("express");
const { ProcessData } = require("../controllers/MainControllers");
const router = express.Router();

router.post("/", ProcessData);

module.exports = router;
