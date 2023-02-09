const express = require("express");
const router = express.Router();
const {createUser, listUsers} = require("../controllers/UserController");

router.route("/").post(createUser);
router.route("/").get(listUsers);

module.exports = router;