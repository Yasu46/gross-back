const sql = require("./db");

// Constructor
const Category = function (category) {
  this.name = category.name;
  this.visible = category.visible;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created category: ", {
      id: res.insertId,
      ...newCategory
    });
    result(null, {
      id: res.insertId,
      ...newCategory
    });
  });
};

Category.checkCategoryName = (name, result) => {
  sql.query("SELECT * FROM categories WHERE name='" + name + "'", (err, res) => {
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

Category.getAllRecords = (result) => {
  sql.query("SELECT * FROM categories", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Category.updateByID = (id, data, result) => {
  sql.query("UPDATE categories SET name=?, visible=? WHERE id=?", 
  [data.name, data.visible, id], (err, res) => {
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
    console.log("Update category: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if(err) {
      console.group("Query error: " + err)
      result(err, null)
      return;
    }
    if(res.affectedRows == 0) {
      result({kind: "not_found"}, null)
      return;
    }
    console.group("Deleted category id: " + id)
    result(null, {id: id})
  });
};

// Category.visible = (id, data, result) => {
//   sql.query("UPDATE categories SET visible=? WHERE id=?", 
//   [data.visible, id], (err, res) => {
//     if(err) {
//       console.log("Query error: " + err);
//       result(err, null);
//       return;
//     }
//     if(res.affectedRows == 0) {
//       // this user id not found
//       result({kind: "not_found"}, null);
//       return;
//     }
//     console.log("Switch category visible: " , { id: id, ...data });
//     result(null, { id: id, ...data });
//   })
// };

module.exports = Category;