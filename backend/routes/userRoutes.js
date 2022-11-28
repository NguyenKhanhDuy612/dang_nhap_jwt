const UserControllers = require("../controllers/userControllers");
const middlewareControler = require("../controllers/middlewareControllers");
const router = require("express").Router();

router.get(
  "/getAll_users",
  middlewareControler.verifyToken,
  UserControllers.getAllUser
);
router.delete(
  "/delete_user/:id",
  middlewareControler.verifyTokenAdminDelete,
  UserControllers.deleteUser
);
module.exports = router;
