// gọi các
const authController = require("../controllers/authControllers");
const middlewareControler = require("../controllers/middlewareControllers");

const router = require("express").Router();
// đăng ký
router.post("/register", authController.registerUser);
// chạy lại
router.post("/refresh", authController.requestRefreshToken);
// đăng nhập
router.post("/login", authController.login);
// đăng xuất
router.post("/logOut", middlewareControler.verifyToken, authController.logOut);
// cập nhật
router.put(
  "/update",
  middlewareControler.verifyToken,
  authController.updateProfile
);

module.exports = router;
