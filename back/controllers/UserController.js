const User = require("../models/User");
const bcrypt = require('bcryptjs')




exports.createUser = (req, res) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.pass, salt)
    try {
      const user = new User (req.body)
      User.create(blog);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(501).json({ error: err.message });
    }
  };