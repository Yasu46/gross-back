const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
//const userRouter = require("./routes/userRoute");


global.__basedir = __dirname;
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({message: "Welcome to my REST API."});
});

//app.use('/user', userRouter);
require("./app/routes/userRoute")(app);
require("./app/routes/staffRoute")(app);
require("./app/routes/categoryRoute")(app);
require("./app/routes/itemRoute")(app);
require("./app/routes/requestRoute")(app);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})