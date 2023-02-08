const express = require("express");
const router = express.Router();

router.route("/auth/resgister").post(createUser);
router.route('/auth/login').get(login)