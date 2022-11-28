// tạo chức năng của người dùng
const User = require("../models/User");
const bcrypt = require("bcrypt"); // mã hóa mật khẩu
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  accessToken: (username1) => {
    return jwt.sign(
      {
        id: username1.id,
        isAdmin: username1.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "10s" }
    );
  },

  refreshToken: (username1) => {
    return jwt.sign(
      {
        id: username1.id,
        isAdmin: username1.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" }
    );
  },
  // chức năng đăng kí
  registerUser: async (req, res) => {
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

  //chức năng đăng nhập
  login: async (req, res) => {
    try {
      // Kiểm tra bcrypt
      const username1 = await User.findOne({ username: req.body.username });
      const password1 = await bcrypt.compare(
        req.body.password,
        username1.password
      );
      if (!username1) {
        return res.status(404).json("Tên đăng nhập sai");
      }
      if (!password1) {
        return res.status(404).json("Mật khẩu sai");
      }
      if (username1 && password1) {
        const accessToken = authController.accessToken(username1);
        const refreshToken = authController.refreshToken(username1);
        refreshTokens.push(refreshToken);
        // lưu refreshToken
        // các tham số là yêu cầu chéo
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict", // cấu hình
        });
        const { password, ...others } = username1._doc;

        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    const refreshToken1 = req.cookies.refreshToken;
    console.log("refreshToken1", refreshToken1);
    if (!refreshToken1) return res.status(401).json("Bạn không được xác thực");
    if (!refreshTokens.includes(refreshToken1)) {
      return res.status(403).json("Mã mới không hợp lệ");
    }
    jwt.verify(refreshToken1, process.env.JWT_REFRESH_KEY, (err, username1) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken1); // chưa hiểu ( thêm vào danh sách)
      //create new access token, refresh token and send to user
      const newRefreshToken = authController.accessToken(username1);
      const newAccessToken = authController.refreshToken(username1);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  // log out
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Đăng xuất thành công!");
  },

  // Update user profile   =>   /v1/auth/update
  updateProfile: async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  },
}; //Take refresh token from user

module.exports = authController;
