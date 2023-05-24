const router = require("express").Router();
const { createUser, getAllUsers } = require("../controller/userController");

router.post("/register", createUser);
router.get("/all-users", getAllUsers);

module.exports = router;
