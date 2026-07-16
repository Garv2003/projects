const controller = require("../controller/controller");
const router = require("express").Router();

router.get("/", controller.fortest);
router.get("/url/", controller.gethome);
router.post("/url/addurl", controller.posturl);
router.get(`/url/shorturl/:id`, controller.redirecturl);

module.exports = router;
