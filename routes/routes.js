const router = require("express").Router();

const user = require("../controllers/user.controllers");
const crudsql = require("../sql/sql");
router.get("/",user.home)
router.get("/register",user.registro)

router.post("/register",crudsql.saveDataForm)

module.exports = router;