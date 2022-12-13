const Category = require("../models/Category");
const createNewCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }
  const CategoryObj = new Category({
    name: req.body.name,
    visible: req.body.visible
  });
  Category.create(CategoryObj, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data)
  });
}

const validCategory = (req, res) => {
  Category.checkCategoryName(req.params.us, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.send({
          message: "Not found " + req.params.us,
          valid: true
        })
      }else{
        res.status(500).send({
          message: "Error retriveing " + req.params.us
        });
      }
    }else res.send({record: data, valid: false});
  });
};

const getAllCategories = (req, res) => {
  Category.getAllRecords((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data);
  });
};

const updateCategory = (req, res) => {
  if(!req.body) {
    res.status(400).send({ message: "Content can not be empty."});
  }
  const data = {
    name: req.body.name,
    visible: req.body.visibility
  };
  Category.updateByID(req.params.id, data, (err, result) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found category id: " + req.params.id
        });
      } else {
        res.status(500).send({
          message: "Error update category id: " + req.params.id
        });
      }
    } else res.send(result);
  });
};

const deleteCategory = (req, res) => {
  Category.remove(req.params.id, (err, result)=>{
    if(err){
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found category id: " + req.params.id
        });
      }else{
        res.status(500).send({
          message: "Error delete category id: " + req.params.id
        });
      }
    }
    else res.send(result);
  });
};

// const visibleCategory = (req, res) => {
//   if(!req.body) {
//     res.status(400).send({ message: "Content can not be empty."});
//   }
//   const data = {
//     visible: !req.body.visible,
//   };
//   Category.visible(req.params.id, data, (err, result) => {
//     if(err) {
//       if(err.kind == "not_found") {
//         res.status(401).send({
//           message: "Not found category id: " + req.params.id
//         });
//       } else {
//         res.status(500).send({
//           message: "Error update category id: " + req.params.id
//         });
//       }
//     } else res.send(result);
//   });
// }
module.exports = {
  createNewCategory,
  validCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  // visibleCategory
}