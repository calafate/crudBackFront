const express = require("express");
const router = express.Router();
const {createUser} = require("../controllers/UserController");

router.route("/").post(createUser);
router.route("/").get();

module.exports = router;