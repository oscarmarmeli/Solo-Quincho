const fs = require("fs");

function saveContactos(contactos) {
  const stringifiedContact = JSON.stringify(contactos, null, 2);
  const result = fs.writeFileSync("contactos.json", stringifiedContact, "utf-8");
  return result;
}

function readContactos() {
  const contactos = fs.readFileSync("contactos.json", "utf-8");
  const contactosParsed = JSON.parse(contactos);
  return contactosParsed;
}

module.exports = {
  saveContactos,
  readContactos,
};
