const router = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controller/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);

module.exports = router;
