const sql = require("./db");
const { strictEqual } = require("assert");

// Constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.address = user.address;
  this.password = user.password;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created user: ", {
      id: res.insertId,
      ...newUser
    });
    result(null, {
      id: res.insertId,
      ...newUser
    });
  });
};

User.checkUserName = (name, result) => {
  sql.query("SELECT * FROM users WHERE name='" + name + "'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found name: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

User.login = (account, result) => {
  sql.query("SELECT * FROM users WHERE name='" + account.name + "'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.length) {
      if(account.password === res[0].password) {
        console.log("Login success.");
        result(null, res[0]);
        return;
      }else{
        console.log("Password invalid.");
        result({kind: "invalid_pass"}, null);
        return;
      }
    }
    result({kind: "not_found"}, null);
  });
}

User.getAllRecords = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    console.log("bbb" + res)
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

User.updateByID = (id, data, result) => {
  sql.query("UPDATE users SET name=?, email=?, address=? WHERE id=?", 
  [data.name, data.email, data.address, id], (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      // this user id not found
      result({kind: "not_found"}, null);
      return;
    }
    console.log("Update user: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if(err) {
      console.group("Query error: " + err)
      result(err, null)
      return;
    }
    if(res.affectedRows == 0) {
      result({kind: "not_found"}, null)
      return;
    }
    console.group("Deleted user id: " + id)
    result(null, {id: id})
  });
};

module.exports = User;