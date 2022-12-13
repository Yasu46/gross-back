const sql = require("./db");
const { strictEqual } = require("assert");

// Constructor
const Item = function (item) {
  this.name = item.name;
  this.price = item.price;
  this.category_id = item.category_id;
  this.visible = item.visible;
}
// const expireTime = "1h";

Item.create = (newItem, result) => {
  sql.query("INSERT INTO items SET ?", newItem, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created item: ", {
      id: res.insertId,
      ...newItem
    });
    result(null, {
      id: res.insertId,
      ...newItem
    });
  });
};

Item.checkItemName = (name, result) => {
  sql.query("SELECT * FROM item WHERE name='" + name + "'", (err, res) => {
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

// Item.getAllRecords = (result) => {
//   sql.query("SELECT * FROM items", (err, res) => {
//     if(err) {
//       console.log("Query error: " + err);
//       result(err, null);
//       return;
//     }
//     result(null, res);
//   });
// }

Item.getAllRecords = (result) => {
  sql.query("SELECT i.id, i.name, i.price, c.name AS category, i.visible FROM items i INNER JOIN categories c ON i.category_id = c.id ORDER BY id ASC;", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Item.getSelectedRecords = (result) => {
  sql.query("SELECT i.id, i.name, i.price, c.name AS category, i.visible FROM items i INNER JOIN categories c ON i.category_id = c.id WHERE i.visible = false and c.visible = false ORDER BY id ASC;", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Item.updateByID = (id, data, result) => {
  sql.query("UPDATE items SET name=?, price=?, visible=? WHERE id=?", 
  [data.name, data.price, data.visible, id], (err, res) => {
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
    console.log("Update item: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

Item.remove = (id, result) => {
  sql.query("DELETE FROM items WHERE id = ?", id, (err, res) => {
    if(err) {
      console.group("Query error: " + err)
      result(err, null)
      return;
    }
    if(res.affectedRows == 0) {
      result({kind: "not_found"}, null)
      return;
    }
    console.group("Deleted item id: " + id)
    result(null, {id: id})
  });
};
module.exports = Item;