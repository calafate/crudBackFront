const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  const usuario = User.findOne({email: req.body.email});
    try {
      if (usuario !== null) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.pass, salt);
        const registerUser = {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          pass: hash,
        };
        const user = new User(registerUser);
        await user.save();
        res.json({ status: "success" });
      } 
    } catch (err) {
      const errors = []
      errors.push({msg: "El email ya esta registrado"})
      res.status(501).json({errors: errors});
    }
};

exports.loginUser = async (req, res) => {
  const errors = []
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (user !== null) {
      const passOK = bcrypt.compareSync(pass, user.pass);
      if (passOK) {
        res.json({ data: user, status: "Login exitoso" });
      } else {
        errors.push({msg: "Contraseña incorrecta"})
        res.status(400).json({ errors: errors });
      }
    } else {
      errors.push({msg: "Usuario inexistente, debe Registrarse"})
      res.status(400).json({ errors: errors });
    }
  } catch (err) {
    errors.push({msg: "Error en el envío de la solicitud (501)"})
    res.status(501).json({ error: errors });
  }
};
