const User = require("../models/userModel");

const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    try {
      // Create a new user
      const newUser = new User(req.body);
      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    // User already exists
    res.json({
      message: "User already exists",
      success: false,
    });
  }
};

module.exports = { createUser };
