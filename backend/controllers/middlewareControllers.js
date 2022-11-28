const jwt = require("jsonwebtoken");

const middlewareControler = {
  //verify
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Mã không hợp lệ");
        }
        req.user = user; // chưa hiểu
        next();
      });
    } else {
      return res.status(401).json("Bạn không thể thực hiện");
    }
  },
  verifyTokenAdminDelete: (req, res, next) => {
    middlewareControler.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("Ban khong the xoa nguoi dung khac");
      }
    });
  },
};

module.exports = middlewareControler;
