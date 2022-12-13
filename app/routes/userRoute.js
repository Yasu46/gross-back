module.exports = (app) => {
  const user_controller = require("../controllers/user.controller.js");
  var router = require("express").Router();
  router.post("/signup", user_controller.createNewUser);
  router.get("/:us", user_controller.validUsername);
  router.post("/login", user_controller.login);
  router.get("/", user_controller.getAllUsers);
  router.put("/:id", user_controller.updateUser);
  router.delete("/:id", user_controller.deleteUser);
  app.use("/users", router);
};