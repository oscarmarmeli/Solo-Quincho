const { body, validationResult } = require("express-validator");

const validateContacto = [
  body("name").notEmpty().withMessage("Debes completar el campo nombre"),
  body("email")
    .notEmpty()
    .withMessage("Debes completar el campo email")
    .bail()
    .isEmail()
    .withMessage("Debes ingresar un email válido"),
  body("telefono").isNumeric().withMessage("Debes ingresar un número válido"),
  // .isStrongPassword()
  // .withMessage("Password Incorrecto"),
  // .isNumber()
  // .withMessage("Debes ingresar un numero válido"),
  // .isBoolean()
  // .withMessage("Debes ingresar un booleano válido"),
  // .isDate()
  // .withMessage("Debes ingresar una fecha válida"),
  // .isAlpha()
  // .withMessage("Debes ingresar solo letras"),
  // .isLength({ max: 100 })
  // .withMessage("El email debe tener menos de 100 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(req.body);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.render("contacto", {
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateContacto;
