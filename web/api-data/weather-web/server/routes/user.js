const express = require("express");
const router = express.Router();
const {
  addPlace,
  deletePlace,
  uploadProfileImg,
  deleteProfileImg,
} = require("../controller/user");
const verify = require("../middleware/verify");
const multer = require("multer");

const upload = multer({});

router.post("/addplace", verify, addPlace);
// router.post("/profileimg", upload.single("profileimg"), uploadProfileImg);

router.delete("/deleteplace", verify, deletePlace);
// router.delete("/deleteprofileimg", verify, deleteProfileImg);

module.exports = router;
