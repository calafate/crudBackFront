const User = require("../models/User");
const Login = require("../models/Login");
const bcrypt = require("bcryptjs");

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
    /* res.json({ data: user }); */
    const passOK = bcrypt.compareSync(usuarioLogin.pass, user.pass);
    console.log(passOK)
    if (passOK) {
      console.log("Login exitoso")
      /* res.json({ data: user, status: "Login exitoso" }); */
      const login = new Login(usuarioLogin);
      await login.save();
      res.json({ data: login, status: "Login exitoso" });
    } else {
      console.log("Datos incorrectos")
      console.log("usuarioLogin.pass", usuarioLogin.pass)
      console.log("user.data.pass", user.data.pass)
      console.log(passOK)
      res.status(501).json({ error: err.message }); 
    }

  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};
