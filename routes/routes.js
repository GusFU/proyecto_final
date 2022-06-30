const router = require("express").Router();

const user = require("../controllers/user.controllers");
const crudsql = require("../sql/sql");
const mongodb = require("../mongodb/mongodb");
router.get("/",user.home)
router.get("/register",user.registro)


router.post("/register",crudsql.saveDataForm)
router.post("/login",crudsql.login)
module.exports = router;