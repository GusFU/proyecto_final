const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const user = require("../controllers/user.controllers2");
const cruds = require("../controllers/cruds");


router.post("/profile",cruds.mejores10Fotos)
router.post("/register",cruds.saveDataForm)
router.post("/login",cruds.login)
router.post("/subircomentario", cruds.subirComentario);
router.post("/comentfotos", cruds.comentFotos);
router.post("/subirfoto",cruds.subirFoto)
router.post("/megusta", cruds.megusta);
router.post("/nomegusta", cruds.nomegusta);
router.post("/buscaramigo", cruds.buscaramigo);
router.post("/haceramigo", cruds.haceramigo);
router.post("/subircomentfotos",cruds.subircomentfotos)


router.post("/confirmuser", user.confirmedUser);
router.get("/confirmuser/:email/:token", user.confirmUserGet);
router.post("/confirmuser1", cruds.checkUserPost);


//subir foto

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "../client/public/images"),
    filename: (req, file,cb) => {
      cb(null, file.originalname);
    },
  });
  const fileUpload = multer({
    storage: diskstorage,
  }).single("archivo");
  router.post("/files/post", fileUpload, (req, res) => {
    console.log(req.file);
  });
//fin subir foto
module.exports = router;