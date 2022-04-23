const express = require("express");
const mongoose = require("mongoose");
const checkLogin = require("../middleware/checkLogin");
const router = express.Router();
const infoSchema = require("../Schema/infoSchema");
const InfoCollection = new mongoose.model("InfoCollection", infoSchema);

router.post("/", async (req, res) => {
  const newInfo = new InfoCollection(req.body);
  await newInfo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.json(newInfo);
    }
  });
});

router.get("/", checkLogin, async (req, res) => {
  try {
    const result = await InfoCollection.find({});
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "there was an error",
    });
  }
});

module.exports = router;
