module.exports = (app) => {
  const item_controller = require("../controllers/item.controller");
  var router = require("express").Router();
  router.post("/create", item_controller.createNewItem);
  // router.get("/:us", item_controller.validItemname);
  //router.post("/login", item_controller.login);
  router.get("/", item_controller.getAllItems);
  router.put("/:id", item_controller.updateItem);
  router.delete("/:id", item_controller.deleteItem);
  router.get("/select", item_controller.getSelectedItems);
  app.use("/items", router);
};