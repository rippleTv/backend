const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const { schemaForLogin, schemaForSignup } = require("./schema");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "Username is required"]
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      lowercase: true,
      default: "user"
    }
  },

  { timestamps: true }
);

// hash password before saving user
userSchema.pre("save", function(next) {
  const saltRounds = 10;
  bcrypt
    .hash(this.password, saltRounds)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

userSchema.statics.joiValidate = function(obj) {
  return Joi.validate(obj, schemaForSignup);
};

userSchema.statics.joiValidateLogin = function(obj) {
  return Joi.validate(obj, schemaForLogin);
};

userSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password).then(match => match);
};
module.exports = mongoose.model("user", userSchema);
