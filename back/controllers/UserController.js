const User = require("../models/User");
const bcrypt = require('bcryptjs')


exports.createUser = async (req, res) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.pass, salt)
    const registerUser = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecNacimiento: req.body.fecNacimiento,
        email: req.body.email,
        pass: hash
    }
    try {
      const user = new User (registerUser)
      await user.save();
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(501).json({ error: err.message });
    }
  };