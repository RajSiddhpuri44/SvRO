const { findOne } = require("../models/Client.model");
const userModel = require("../models/users.model");
const signup = async (req, res) => {
  try {
    const { email, password, age, username } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
      console.log("exist");
      return res.send("user exist");
    }
    const newUser = new userModel({ email, password, age, username });
    await newUser.save();
    res.send("saved");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = {
  signup,
};
