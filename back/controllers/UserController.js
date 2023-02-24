const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
        const hash = User.encryptPass(req.body.pass);
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
      const passOK = User.comparePass(pass, user.pass);
      if (passOK) {
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
          expiresIn: 60 * 60 * 24
        })
        res.json({ status: "Login exitoso", data: user, token: token });
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

exports.profileUser = async (req, res) => {
  const user = await User.findById(req.userId, {pass: 0});
  if(!user){
    return res.status(404).send("No se encontro el usuario");
  }

  res.json(user);

};