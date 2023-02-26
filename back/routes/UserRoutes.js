const express = require("express");
const router = express.Router();
const { userValidationRules, validate, loginValidationRules, verifyToken } = require("../middleware/validator");
const { registerUser, loginUser, listUsers, profileUser, modifyUser } = require("../controllers/UserController");


//RUTAS de usuario, registro y login
router.post("/register", userValidationRules(), validate, registerUser);
router.put("/modify/:email", modifyUser);
router.post("/login", loginValidationRules(), validate, loginUser);
router.get("/profile", verifyToken, profileUser);
router.get("/list", listUsers);


module.exports = router;