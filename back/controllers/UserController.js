const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.pass, salt);
    const registerUser = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      pass: hash,
    };
    try {
      const user = new User(registerUser);
      await user.save();
      res.json({ data: user, status: "success" });
      res.send("Validacioón exitosa")
    } catch (err) {
      res.status(501).json({ error: err.message });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  const {email, pass} = req.body;
  if (errors.isEmpty()) {
    try {
      const user = await User.findOne({email});
      if (user !== null) {
        const passOK = bcrypt.compareSync(pass, user.pass);
        if (passOK) {
          res.json({ data: user, status: "Login exitoso" });
        } else {
          res.status(400).json({error: "Contraseña incorrecta"});
        }
      } else {
        res.status(400).json({ error: "Usuario inexistente, debe Registrarse" });
      }
    } catch (err) {
      res.status(501).json({ error: err.message });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
  
};

