const {check} = require('express-validator');

exports.registerUserValidate = [
    check('name')
        .exists()
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
]

