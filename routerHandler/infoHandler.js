const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const infoSchema = require("../Schema/infoSchema");
const InfoCollection = new mongoose.model("InfoCollection", infoSchema);

router.post("/", async (req, res) => {
  try {
    const newInfo = new InfoCollection(req.body);
    await newInfo.save();
    res.status(200).json({
      message: "all is well!",
    });
  } catch (err) {
    res.status(500).json({
      message: "There was a server side error!",
    });
  }
  /* const newInfo = new InfoCollection(req.body);
  await newInfo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "all good!",
      });
      res.json(newInfo);
    }
  }); */
});

router.get("/", async (req, res) => {
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
