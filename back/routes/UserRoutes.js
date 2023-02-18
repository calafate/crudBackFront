const express = require("express");
const router = express.Router();
const {check} = require("express-validator")
const registerUserValidate = require("../middleware/userValidate")
const {
    registerUser,
    loginUser,
    listUsers
} = require("../controllers/UserController");

router.post("/register",[
    check('name')
        .not()
        .isEmpty()
        .isLength({min:3})
        .withMessage('Ingrese Nombre con mas de 3 caracteres'),
    check('apellido')
        .exists()
        .not()
        .isEmpty()
        .isLength({min:3})
        .withMessage('Ingrese Apellido con mas de 3 caracteres'),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Ingrese un email valido'),
    check('pass')
        .exists()
        .not()
        .isEmpty()
        .isLength({min:4})
        .withMessage('La contraseña debe tener 4 o mas caracteres')
] , registerUser);

router.post("/login", loginUser);
router.get("/list", listUsers);


module.exports = router;