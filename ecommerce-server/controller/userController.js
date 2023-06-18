const genToken = require("../connection/jwToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  // Check if user already exists
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // Throw an error if the user already exists
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  // Check if the user exists and the password matches
  if (findUser && (await findUser.isPasswordMatched(password))) {
    // Send the user data as the response
    res.json({
      _id: findUser?.id,
      first_name: findUser?.first_name,
      last_name: findUser?.last_name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: genToken(findUser?.id),
    });
  } else {
    // Throw an error if the password or email is incorrect
    throw new Error("Incorrect password or email!");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      // Si el usuario no tiene el rol de administrador, retorna un error de autorización
      return res.status(403).json({ error: 'No tienes permiso para acceder a estos datos.' });
    }

    // Retrieve all users
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    // Throw an error if there's an exception
    throw new Error(error);
  }
});

module.exports = { createUser, getAllUsers, loginUser };
