const express = require("express");
const {
  renderIndex,
  renderLogin,
  renderParana,
  renderPacifico,
  renderDelta,
  renderMalevo,
  renderPuma,
  renderCamper,
  renderContacto,    
  renderRegistro,
  registrarNuevo,
  login,
  renderCarrito1,
  registrarContacto,
} = require("../controller/indexControllers");
const validateRegister = require("../middleware/validateRegister");
const validateContacto = require("../middleware/validateContacto");
const router = express.Router();

router.get("/index", renderIndex); //pagina de inicio
router.get("/login", renderLogin); //pagina de login
router.post("/login", login); //logica de registro
router.get("/registro", renderRegistro); //pagina de registro
router.post("/registro", validateRegister, registrarNuevo); //logica de registro
router.get("/contacto", renderContacto); //pagina de contacto
router.post("/contacto", validateContacto, registrarContacto); //logica de contacto
router.get("/parana", renderParana); //pagina de Parana
router.get("/pacifico", renderPacifico); //pagina de Pacifico
router.get("/delta", renderDelta); //pagina de Delta
router.get("/malevo", renderMalevo); //pagina de Malevo
router.get("/puma", renderPuma); //pagina de Puma
router.get("/camper", renderCamper); //pagina de Camper
router.get("/carrito-1", renderCarrito1); //pagina de Carrito-1
module.exports = router;