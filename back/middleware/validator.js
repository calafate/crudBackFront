const { check, validationResult } = require('express-validator')
/* const { Blog } = require('../models/Blog')
const { User } = require('../models/User') */

const blogValidationRules = () => {
  return [
    check("title").not().isEmpty().withMessage("Ingrese titulo de la Publicación"),
    check("summary").not().isEmpty().withMessage("Ingrese resumen de la Publicación"),
    check("body").not().isEmpty().withMessage("Ingrese texto de la Publicación"),
    check("category").not().isEmpty().withMessage("Ingrese una categoría"),
    check("createdAt").not().isEmpty().withMessage("Ingrese una Fecha"),
   /*  check("image").not().isEmpty().withMessage("Ingrese una Imagen") */
  ]
}

const validarID = async (req, res, next) => {
  const ID = req.params.id
  if (ID.length === 24) {
    console.log("Formato de ID correcto");
    next();
  } else {
    res.status(500).json({msg:"ID invalido debe poseer 24 caracteres alfanumericos"});
  }
}

const userValidationRules = () => {
  return [
    check("nombre").not().isEmpty().isLength({ min: 3 }).withMessage("Ingrese Nombre con mas de 3 caracteres"),
    check("apellido").not().isEmpty().isLength({ min: 3 }).withMessage("Ingrese Apellido con mas de 3 caracteres"),
    check("email").not().isEmpty().isEmail().withMessage("Ingrese un email valido"),
    check("pass").not().isEmpty().isLength({ min: 4 }).withMessage("La contraseña debe tener 4 o mas caracteres"),
  ]
}

const loginValidationRules = () => {
  return [
    check("email").not().isEmpty().isEmail().withMessage("Ingrese un email valido"),
    check("pass").not().isEmpty().isLength({ min: 4 }).withMessage("Contraseña incorrecta")
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  res.status(400).json({errors: errors.array()});
}

module.exports = {
  blogValidationRules,
  userValidationRules,
  loginValidationRules,
  validarID,
  validate,
}