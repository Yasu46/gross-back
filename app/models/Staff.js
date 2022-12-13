const sql = require("./db");
const { strictEqual } = require("assert");

// Constructor
const Staff = function (staff) {
  this.name = staff.name;
  this.visible = staff.visible
  this.staff_status = staff.staff_status
}

Staff.create = (newStaff, result) => {
  sql.query("INSERT INTO staffs SET ?", newStaff, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created staff: ", {
      id: res.insertId,
      ...newStaff
    });
    result(null, {
      id: res.insertId,
      ...newStaff
    });
  });
};

Staff.getStaffRecords = (result) => {
  sql.query("SELECT * FROM staffs", (err, res) => {
    console.log(res)
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Staff.getSelectedRecords = (result) => {
  sql.query("SELECT id, name FROM staffs WHERE staff_status=0 AND visible=0", (err, res) => {
    //console.log("bbb" + res)
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

Staff.updateByID = (id, data, result) => {
  sql.query("UPDATE staffs SET name=?, visible=? WHERE id=?", 
  [data.name, data.visible, id], (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      // this staff id not found
      result({kind: "not_found"}, null);
      return;
    }
    console.log("Update staff: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

Staff.updateStatusByID = (id, data, result) => {
  sql.query("UPDATE staffs SET staff_status=? WHERE id=?", 
  [data.staff_status, id], (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0) {
      // this staff id not found
      result({kind: "not_found"}, null);
      return;
    }
    console.log("Update staff: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

// Staff.updateByID = (id, data, result) => {
//   sql.query("UPDATE staffs SET name=?, staff_status=? WHERE id=?", 
//   [data.name, data.staff_status, id], (err, res) => {
//     if(err) {
//       console.log("Query error: " + err);
//       result(err, null);
//       return;
//     }
//     if(res.affectedRows == 0) {
//       // this staff id not found
//       result({kind: "not_found"}, null);
//       return;
//     }
//     console.log("Update staff: " , { id: id, ...data });
//     result(null, { id: id, ...data });
//   })
// };

Staff.remove = (id, result) => {
  sql.query("DELETE FROM staffs WHERE id = ?", id, (err, res) => {
    if(err) {
      console.group("Query error: " + err)
      result(err, null)
      return;
    }
    if(res.affectedRows == 0) {
      result({kind: "not_found"}, null)
      return;
    }
    console.group("Deleted staffs id: " + id)
    result(null, {id: id})
  });
};

module.exports = Staff;