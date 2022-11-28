const User = require("../models/User");
const bcrypt = require("bcrypt"); // mã hóa mật khẩu

const UserControllers = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deleteUser = await User.findById(req.params.id);
      return res.status(200).json("Xóa thành công");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  editUser: async (req, res) => {
    try {
      //hash password khai báo bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save to DB
      const user = await newUser.save();
      console.log("thành công", newUser);

      res.status(200).json(user);
    } catch (err) {
      console.log("lỗi", err);
      res.status(500).json(err);
    }
  },
};

module.exports = UserControllers;
