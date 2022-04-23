const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const infoHandler = require("./routerHandler/infoHandler");
const userHandler = require("./routerHandler/userHandler");

const app = express();
app.use(cors());
app.use(express.json());

/*
info_app
MlBF211xflwQMKuy 
 */
// connect mongoose
mongoose
  .connect(
    "mongodb+srv://info_app:MlBF211xflwQMKuy@cluster0.quagy.mongodb.net/infoDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/info", infoHandler);
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(5000, () => {
  console.log("listening to the port 5000");
});
