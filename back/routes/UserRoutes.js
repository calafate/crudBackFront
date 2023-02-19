const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
    registerUser,
    loginUser,
    listUsers
} = require("../controllers/UserController");

router.post("/register", [
    check("nombre").not().isEmpty().isLength({ min: 3 })
        .withMessage("Ingrese Nombre con mas de 3 caracteres"),
    check("apellido").not().isEmpty().isLength({ min: 3 })
        .withMessage("Ingrese Apellido con mas de 3 caracteres"),
    check("email").not().isEmpty().isEmail()
        .withMessage("Ingrese un email valido"),
    check("pass").not().isEmpty().isLength({ min: 4 })
        .withMessage("La contraseña debe tener 4 o mas caracteres"),
    ], registerUser);

router.post("/login", [
    check("email").not().isEmpty().isEmail()
        .withMessage("Ingrese un email valido"),
    check("pass").not().isEmpty().isLength({ min: 4 })
        .withMessage("La contraseña debe tener 4 o mas caracteres"),
], loginUser);

router.get("/list", listUsers);


module.exports = router;