const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    picture: {
      type: String,
      default: "",
    },
    description: {
        type: String,
        default: "",
    },
    available: {
        type: Boolean,
        default: true,
    }
  },
  { timestamps: true }
);

const UserData = mongoose.model("user_Data", dataSchema);
// module.exports = mongoose.model("User", userSchema);
module.exports = UserData;
