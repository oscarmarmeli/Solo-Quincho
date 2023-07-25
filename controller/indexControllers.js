const fs = require("fs");
const bcrypt = require("bcrypt");
const { saveUsuarios, readUsuarios } = require("../services/usuariosServices");
const {
  saveContactos,
  readContactos,
} = require("../services/contactosServices");

const renderIndex = (req, res) => {
  res.render("index");
};
const renderLogin = (req, res) => {
  res.render("login", { errors: [] });
};
const renderParana = (req, res) => {
  res.render("parana");
};
const renderPacifico = (req, res) => {
  res.render("pacifico");
};
const renderDelta = (req, res) => {
  res.render("delta");
};
const renderMalevo = (req, res) => {
  res.render("malevo");
};
const renderPuma = (req, res) => {
  res.render("puma");
};
const renderCamper = (req, res) => {
  res.render("camper");
};
const renderCarrito1 = (req, res) => {
  res.render("carrito-1");
};
const renderContacto = (req, res) => {
  res.render("contacto", { errors: [] });
};
const renderRegistro = (req, res) => {
  res.render("register", { errors: [] });
};
const registrarNuevo = (req, res) => {
  // Destructuring
  const { email, password } = req.body;
  const usuarios = readUsuarios();
  const resultado = usuarios.some((user) => user.email === email);
  if (resultado) {
    return res.status(400).send("El usuario ya existe");
  }
  // Generar un salt (valor aleatorio) para fortalecer el hashing
  const saltRounds = 10;
  // Aplicar el hashing de la contraseña utilizando bcrypt
  bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al hashear la contraseña");
      return;
    }
    // Crear un objeto con el email y la contraseña hasheada
    const nuevoUsuario = {
      email,
      password: hashedPassword, // Guardar la contraseña hasheada en lugar de la original
    };

    const usuarios = readUsuarios();
    usuarios.push(nuevoUsuario);
    saveUsuarios(usuarios);

    // Guardar el valor del usuario recién registrado en la sesión
    req.session.usuario = nuevoUsuario;

    // Redireccionar al endpoint /admin/perfil
    res.redirect("/admin/perfil");
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const usuarios = fs.readFileSync("usuarios.json", "utf-8");
  const usuariosParsed = JSON.parse(usuarios);
  const usuarioFinded = usuariosParsed.find((user) => user.email === email);
  if (!Array.isArray(usuariosParsed)) {
    return res.send("Credenciales inválidas");
  }
  if (!usuarioFinded) {
    return res.status(400).send("El usuario no existe");
  }
  bcrypt.compare(password, usuarioFinded.password, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al comparar contraseñas");
    }
    if (result) {
      // Contraseña correcta, redireccionar al perfil
      res.redirect("/index");
    } else {
      // Contraseña incorrecta, renderizar una vista con el error
      return res.status(401).send("Contraseña incorrecta");
    }
  });
};

const registrarContacto = (req, res) => {
  // Destructuring
  const { name, email, telefono, mensaje } = req.body;
  const mensajes = readContactos();
  const resulcont = mensajes.some((user) => user.email === email);
  if (resulcont) {
    return res.status(400).send("El contacto ya existe");
  }
  // Crear un objeto con el email y la contraseña hasheada
  const nuevoContacto = {
    name,
    email,
    telefono,
    mensaje,
  };

  const contactos = readContactos();
  contactos.push(nuevoContacto);
  saveContactos(contactos);

  // Guardar el contacto recién registrado en la sesión
  req.session.contacto = nuevoContacto;

  // Redireccionar al /index
  res.redirect("/index");
};

module.exports = {
  renderIndex,
  renderLogin,
  renderParana,
  renderPacifico,
  renderDelta,
  renderMalevo,
  renderPuma,
  renderCamper,
  renderCarrito1,
  renderContacto,
  renderRegistro,
  registrarNuevo,
  registrarContacto,  
  login,
};
