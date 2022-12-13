//const bcrypt = require("bcryptjs");
const User = require("../models/User");
const createNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  //const salt = bcrypt.genSaltSync(10);
  const userObj = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  });
  User.create(userObj, (err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."

      })
    }else res.send(data)
  });
}

const validUsername = (req, res) => {
  User.checkUserName(req.params.us, (err, data) => {
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

const login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const account = new User({
    name: req.body.name,
    password: req.body.password
  });
  console.log("aaa "+req.body);

  User.login(account, (err, data) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found " + req.body.name
        });
      } else if (err.kind == "invalid_pass") {
        res.status(401).send({
          message: "Invalid Password"
        });
      }else{
        res.status(500).send({
          message: "Error retriveing " + req.body.name
        });
      }
    }else res.send(data);
  });
};

const getAllUsers = (req, res) => {
  User.getAllRecords((err, data) => {
    console.log("aaa" + data)
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating."
      })
    }else res.send(data);
  });
};

const updateUser = (req, res) => {
  if(!req.body) {
    res.status(400).send({ message: "Content can not be empty."});
  }
  const data = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  };
  User.updateByID(req.params.id, data, (err, result) => {
    if(err) {
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found user id: " + req.params.id
        });
      } else {
        res.status(500).send({
          message: "Error update user id: " + req.params.id
        });
      }
    } else res.send(result);
  });
};

const deleteUser = (req, res) => {
  User.remove(req.params.id, (err, result)=>{
    if(err){
      if(err.kind == "not_found") {
        res.status(401).send({
          message: "Not found user id: " + req.params.id
        });
      }else{
        res.status(500).send({
          message: "Error delete user id: " + req.params.id
        });
      }
    }
    else res.send(result);
  });
};

module.exports = {
  createNewUser,
  validUsername,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
}