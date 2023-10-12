const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works when creating account, not while logging in
      validator: function (element) {
        return element === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

// middleware function to execute before saving a user document to database
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // 1000ms=1s
  next();
});

// this middleware function should be executed before any query that starts with "find" on the user schema
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } }); // this will filter out all the users whose active property is set to false
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // check if passwordChangedAt property exists for this user, exists => user has changed their password at least once
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // If the JWT timestamp is less than the password change timestamp, it means the password has been changed after the JWT was issued, and the method returns true
    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
