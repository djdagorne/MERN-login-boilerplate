const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const router = require("express").Router();

// async so we can wait for promises
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, username } = req.body;

    if (!email || !password || !passwordCheck || !username) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password needs to be 6 or more characters." });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Email is in use. Message admins for more information." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    const savedUser = await hashedUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
