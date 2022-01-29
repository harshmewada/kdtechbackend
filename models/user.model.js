const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: false,

      // enum: roles,
      default: "superadmin",
    },

    password: {
      type: String,
      required: false,
      minlength: 8,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
