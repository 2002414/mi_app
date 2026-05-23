const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Servir frontend desde carpeta public

// Base de datos temporal en memoria
let contactos = [];

// Rutas API
app.get("/api/contactos", (req, res) => {
  res.json(contactos);
});

app.post("/api/contactos", (req, res) => {
  const { nombre, telefono, correo } = req.body;
  contactos.push({ nombre, telefono, correo });
  res.json({ mensaje: "Contacto agregado", contactos });
});

app.delete("/api/contactos/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  contactos = contactos.filter(c => c.nombre !== nombre);
  res.json({ mensaje: "Contacto eliminado", contactos });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

