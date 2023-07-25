const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); //motor de plantillas ejs
app.use(express.static("public")); //carpeta publica para archivos estaticos (css, js, img, etc)
app.use(express.urlencoded({ extended: true })); //para poder leer los datos de un formulario
app.use(express.json()); //para poder leer los datos de un formulario
app.use(cookieParser()); //Configurar cookie-parser

// Configurar express-session
app.use(
  session({
    secret: "mi_secreto", // Cambia esto por una cadena secreta única para tu aplicación
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Configura a true si estás utilizando HTTPS
      httpOnly: true,
      maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (aquí se establece a 1 hora)
    },
  })
);

// rutas principales, a las que se puede acceder sin estar logeado, ej pagina de inicio, pagina de registro, pagina de login
app.use("/", indexRoutes); //contiene la vista index, login, registro
// rutas protegidas, solo pueden acceder los que inician sesion, ej pagina de perfil
app.use("/admin", require("./routes/adminRoutes")); //contiene la vista perfil
// // rutas de api para usuarios, para la lógica CRUD en usuarios. (GET, POST, PUT, DELETE)
// app.use("/api/usuarios",require("./routes/usuariosRoutes"));

//Handling '/' principal
//app.get("/index",function (req, res) {
//    res.send("Página principal");
//});

//Handling '/contacto' request
//app.get("/contacto", function (req, res) {
//  res.send("Contacto");
//});

//Handling '/registro' request
//app.get("/registro", function (req, res) {
//  res.send("Registro");
//});

//Handling '/carrito-1' request
//app.get("/carrito-1", function (req, res) {
//  res.send("Carrito-1");
//});

//Server setup
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
