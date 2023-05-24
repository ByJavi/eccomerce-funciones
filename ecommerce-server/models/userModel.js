const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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

// Hash the password before saving
userSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (!this.isModified("password")) {
    next();
    return;
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare entered password with stored password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a password reset token
userSchema.methods.createPasswordResetToken = async function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the reset token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set the expiration time for the password reset token (30 minutes from now)
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
