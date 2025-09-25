const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(201).json({ message: "User already Exist! Login..." });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = new userModel({ email, password: hash, username });
        await newUser.save();
        return res
          .status(200)
          .json({ message: "User Registered Successfully!" });
      });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found, Signup!" });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      return res.status(200).json({ message: "Login Successful" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  });
};
module.exports = {
  signup,
  login,
};
