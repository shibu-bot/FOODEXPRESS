const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const key = "ShIbU";
// SIGNUP
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    const salt = await bcryptjs.genSalt(10);
    let securePassword = await bcryptjs.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
);

//LOGIN
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Put Correct Credentials.." });
      }
      // we have to compare the password here
      const passCompare = await bcryptjs.compare(
        req.body.password,
        userData.password
      );
      if (!passCompare) {
        return res.status(400).json({ errors: "Put Correct Credentials.." });
      }
      const data = {
        user: { id: userData.id },
      };
      const authToken = jwt.sign(data, key);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
