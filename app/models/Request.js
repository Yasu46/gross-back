const sql = require("./db");
const { strictEqual } = require("assert");

// Constructor
const Request = function (request) {
  this.user_id = request.user_id;
  this.staff_id = request.staff_id;
  this.total_price = request.total_price;
  this.request_date = request.request_date;
  this.status = request.status;
}

Request.create = (newRequest, result) => {
  sql.query("INSERT INTO requests SET ?", newRequest, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Created request: ", {
      id: res.insertId,
      ...newRequest
    });
    result(null, {
      id: res.insertId,
      ...newRequest
    });
  });
};

Request.getAllRecords = (result) => {
  sql.query("SELECT * FROM requests", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.updateByID = (id, data, result) => {
  sql.query("UPDATE requests SET status=?, staff_id=? WHERE id=?", 
  [data.status, data.staff_id, id], (err, res) => {
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
    console.log("Update status: " , { id: id, ...data });
    result(null, { id: id, ...data });
  })
};

Request.getHistoriesByID = (id, result) => {
  sql.query("SELECT id, total_price, request_date, status FROM requests WHERE user_id = ?", id, (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
}

Request.remove = (id, result) => {
  sql.query("DELETE FROM requests WHERE id = ?", id, (err, res) => {
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

Request.getAllToDos = (result) => {
  sql.query("SELECT r.id, r.request_date, u.address, u.email, r.staff_id, r.status FROM requests r inner join users u on u.id = r.user_id WHERE r.status IN ('In-progress' , 'Completed')", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.getAllTransactions = (result) => {
  sql.query("SELECT count(*) AS total FROM requests", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.getTodayTransactions = (date, result) => {
  sql.query("SELECT count(*) AS total FROM requests WHERE request_date LIKE '" + date + "%'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.getAllPending = (date, result) => {
  sql.query("SELECT count(*) AS total FROM requests WHERE status = 'pending' AND request_date LIKE '" + date + "%'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.getAllInProgress = (date, result) => {
  sql.query("SELECT count(*) AS total FROM requests WHERE status = 'In-progress' AND request_date LIKE '" + date + "%'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Request.getAllRejected = (date, result) => {
  sql.query("SELECT count(*) AS total FROM requests WHERE status = 'Rejected' AND request_date LIKE '" + date + "%'", (err, res) => {
    if(err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Request;