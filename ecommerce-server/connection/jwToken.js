var jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;

const genToken = (id) => {
  return jwt.sign({ id }, privateKey, { expiresIn: "3d" });
};

module.exports = genToken;
