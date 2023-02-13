const User = require("../models/User");
const Login = require("../models/Login");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "EstaEsUnaPalabraSecreta"

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listLoginUsers = async (req, res) => {
  try {
    const loginusers = await Login.find();
    res.json({ data: loginusers, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.pass, salt);
  const registerUser = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecNacimiento: req.body.fecNacimiento,
    email: req.body.email,
    pass: hash,
  };
  try {
    const user = new User(registerUser);
    await user.save();
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const usuarioLogin = {
    email: req.body.email,
    pass: req.body.pass,
  };
  try {
    const user = await User.findOne({email: usuarioLogin.email});
    if (user !== null) {
      const passOK = bcrypt.compareSync(usuarioLogin.pass, user.pass);
      if (passOK) {
        jwt.sign({user,id:user._id}, secret, {}, (err, token) =>{
          if(err) throw err;
          res.cookie('token', token).json("OK");
        })
          
        const login = new Login(usuarioLogin);
        await login.save();
        res.json({ data: login, status: "Login exitoso" });
      } else {
        console.log("Contraseña incorrecta")
        res.status(400).json("Contraseña incorrecta");
        res.status(501).json({ error: err.message }); 
      }
    } else {
      console.log("Usuario inexistente, debe Registrarse")
      res.status(501).json({ error: err.message });
    }
  } catch (err) {
    console.log("Usuario logeado")
    res.status(501).json({ error: err.message });
  }
};
exports.deleteLogin = async (req, res) => {
  const usuarioLogin = {
    email: req.body.email,
  };
  try {
    const login = await Login.findOneAndDelete({email: req.body.email});
    res.json({ data: login, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
