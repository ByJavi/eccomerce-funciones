const mongoose = require("mongoose");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    last_name: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    mobile: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (!this.isModified("password")) {
    next();
    return;
  }

  // Generate a salt
  const salt = await crypto.randomBytes(10).toString("hex");

  // Hash the password with the salt
  const hashedPassword = SHA256(this.password + salt).toString();

  // Set the hashed password as the new password
  this.password = hashedPassword;

  next();
});

userSchema.methods.isPasswordMatched = function (enteredPassword) {
  // Extract the salt from the stored password
  const salt = this.password.slice(0, 20);

  // Hash the entered password with the salt
  const hashedPassword = SHA256(enteredPassword + salt).toString();

  // Compare the hashed password with the stored password
  return this.password === hashedPassword;
};

userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Set the password reset token
  this.passwordResetToken = SHA256(resetToken).toString();

  // Set the expiration time for the password reset token (30 minutes from now)
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  // Return the reset token
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
