const express = require("express");
const router = express.Router();
const {
    registerUser, 
    loginUser, 
    listLoginUsers,
    deleteLogin,
    listUsers,
} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/login", listLoginUsers);
router.delete("/login/:id",deleteLogin);
router.get("/list", listUsers);


module.exports = router;