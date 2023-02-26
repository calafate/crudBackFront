const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const blogValidationRules = () => {
  return [
    check("title").not().isEmpty().withMessage("Ingrese titulo de la Publicación"),
    check("summary").not().isEmpty().withMessage("Ingrese resumen de la Publicación"),
    check("body").not().isEmpty().withMessage("Ingrese texto de la Publicación"),
    check("category").not().isEmpty().withMessage("Ingrese una categoría"),
    check("fecha").not().isEmpty().withMessage("Ingrese una Fecha")
  ]
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

const verifyToken = (req, res, next) => {
  const errors = []
  const token = req.headers["x-access-token"]
  if(!token) {
    errors.push({msg: "Acceso no autorizado"})
    return res.status(401).json({
      auth: false,
      msg: "No token - Acceso no autorizado"
    })
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.userId = decoded.id;
  next();
}

module.exports = {
  blogValidationRules,
  userValidationRules,
  loginValidationRules,
  validate,
  verifyToken
}