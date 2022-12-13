//const bcrypt = require("bcryptjs");
const Item = require("../models/Item");
const createNewItem = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }
  //const salt = bcrypt.genSaltSync(10);
  const itemObj = new Item({
    name: req.body.name,
    price: req.body.price,
    category_id: req.body.category_id,
    visible: req.body.visible,
  });
  Item.create(itemObj, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data)
  });
}

// const validItemname = (req, res) => {
//   Item.checkItemName(req.params.us, (err, data) => {
//     if(err) {
//       if(err.kind == "not_found") {
//         res.send({
//           message: "Not found " + req.params.us,
//           valid: true
//         })
//       }else{
//         res.status(500).send({
//           message: "Error retriveing " + req.params.us
//         });
//       }
//     }else res.send({record: data, valid: false});
//   });
// };

// const login = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty."
//     });
//   }

//   const account = new User({
//     name: req.body.name,
//     password: req.body.password
//   });
//   console.log("aaa "+req.body);

//   User.login(account, (err, data) => {
//     if(err) {
//       if(err.kind == "not_found") {
//         res.status(401).send({
//           message: "Not found " + req.body.name
//         });
//       } else if (err.kind == "invalid_pass") {
//         res.status(401).send({
//           message: "Invalid Password"
//         });
//       }else{
//         res.status(500).send({
//           message: "Error retriveing " + req.body.name
//         });
//       }
//     }else res.send(data);
//   });
// };

const getAllItems = (req, res) => {
  Item.getAllRecords((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data);
  });
};

const getSelectedItems = (req, res) => {
  Item.getSelectedRecords((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data);
  });
};

const updateItem = (req, res) => {
  if(!req.body) {
    res.status(400).send({ message: "Content can not be empty."});
  }
  const data = {
    name: req.body.name,
    price: req.body.price,
    visible: req.body.visibility
  };
  Item.updateByID(req.params.id, data, (err, result) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found item id: " + req.params.id
        });
      } else {
        res.status(500).send({
          message: "Error update item id: " + req.params.id
        });
      }
    } else res.send(result);
  });
};

const deleteItem = (req, res) => {
  Item.remove(req.params.id, (err, result)=>{
    if(err){
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found item id: " + req.params.id
        });
      }else{
        res.status(500).send({
          message: "Error delete item id: " + req.params.id
        });
      }
    }
    else res.send(result);
  });
}
module.exports = {
  createNewItem,
  getAllItems,
  updateItem,
  deleteItem,
  getSelectedItems
}