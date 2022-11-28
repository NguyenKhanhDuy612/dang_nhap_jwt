// khai báo thông tin của user
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // require: true,
      min: 6,
      max: 20,
      // unique: true, //tra ve loi khi giong nhau
    },
    email: {
      type: String,
      // require: true,
      max: 50,
      // unique: true,
    },
    password: {
      type: String,
      // require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false, // mặc định không phải admin
    },
  },
  { timestamps: true } // xem user update khi nào
);

const User = mongoose.model("User", userSchema);
module.exports = User;
