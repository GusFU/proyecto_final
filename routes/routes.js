const router = require("express").Router();

const user = require("../controllers/user.controllers2");
const cruds = require("../controllers/cruds");

//router.get("/",user.home)
//router.get("/register",user.registro)
router.post("/profile",cruds.mejores10Fotos)


router.post("/register",cruds.saveDataForm)
router.post("/login",cruds.login)
module.exports = router;