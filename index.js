const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const infoHandler = require("./routerHandler/infoHandler");

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

app.listen(5000, () => {
  console.log("listening to the port 5000");
});
