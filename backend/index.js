const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoutes");
// var bodyParser = require("body-parser");

dotenv.config(); // muốn kết nối vào env process.env.MONGDB
const app = express();
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());

// kết nối mongose
mongoose.connect(
  process.env.MONGDB,

  (err) => {
    if (err) console.log("lỗi", err);
    else console.log("mongdb is connected");
  }
);

app.use(cors()); // ngăn lỗi
app.use(cookieParser()); // tạo cookie
app.use(express.json()); //chuyển kiểu json

//ROUTE
app.use("/v1/auth", authRoute);

app.use("/v1/user", userRoute);

app.listen(8000, () => {
  console.log("serrver is running");
});
