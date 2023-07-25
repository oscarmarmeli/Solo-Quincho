const express = require("express");
const { readUsuarios } = require("../services/usuariosServices");
const { readContactos } = require("../services/contactosServices");
const router = express.Router();

router.get("/", (req, res) => {
  const usuarios = readUsuarios();
  res.json(usuarios);
});

router.get("/", (req, res) => {
  const contactos = readContactos();
  res.json(contactos);
});