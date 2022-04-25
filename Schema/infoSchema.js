const mongoose = require("mongoose");
const validator = require("validator");

const infoSchema = mongoose.Schema({
  blockchain: {
    type: String,
    required: true,
  },
  enquiry: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 8,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 8,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    /* validate(value) {
      if (!validator.isMobilePhone(value, ["bn-BD"])) {
        throw new Error("phone number invalid");
      }
    }, */
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("invalid url");
      }
    },
  },
  jobTitle: {
    type: String,
  },
  budget: {
    type: String,
    required: true,
  },
  aboutUs: {
    type: String,
    required: true,
  },

  completion: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = infoSchema;
