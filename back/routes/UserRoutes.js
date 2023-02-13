const express = require("express");
const router = express.Router();
const {registerUser, loginUser, listUsers, listLoginUsers} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list", listUsers);
router.get("/login", listLoginUsers);


module.exports = router;