const mongoose = require("mongoose");
const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    last_name: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
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
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await crypto.randomBytes(10).toString("hex");
  const hashedPassword = SHA256(this.password + salt).toString();
  this.password = hashedPassword;

  next();
});

userSchema.methods.isPasswordMatched = function (enteredPassword) {
  const salt = this.password.slice(0, 20);
  const hashedPassword = SHA256(enteredPassword + salt).toString();
  return this.password === hashedPassword;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = SHA256(resetToken).toString();
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutos

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
