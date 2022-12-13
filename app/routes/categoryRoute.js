module.exports = (app) => {
  const category_controller = require("../controllers/category.controller");
  var router = require("express").Router();
  router.post("/create", category_controller.createNewCategory);
  //router.get("/:us", category_controller.validCategory);
  //router.post("/login", item_controller.login);
  router.get("/", category_controller.getAllCategories);
  router.put("/:id", category_controller.updateCategory);
  router.delete("/:id", category_controller.deleteCategory);
  // router.post("/visible", category_controller.visibleCategory);
  app.use("/categories", router);
};