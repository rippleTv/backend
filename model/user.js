const mongoose = require('mongoose');
const Joi = require('joi');
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, 'Username is required']
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    password2: {
      type: String,
      required: [true, 'Password2 is required']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      lowercase: true,
      default: 'user'
    }
  },
  { timestamps: true }
);



userSchema.methods.joiValidate = function(obj) {
	
	return Joi.validate(obj, schema);
}

const schema = {
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
  // password2: Joi.equal(schema.password).required(),
  email: Joi.string().email().required(),
  role: Joi.string().allow().min(4).max(10)

}



module.exports = mongoose.model("user", userSchema)