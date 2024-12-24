const mongoose = require('mongoose');

// Definimos el esquema de los productos con los nuevos campos y requerimientos
const ProductSchema = new mongoose.Schema({
  nombreProducto: { type: String, required: true }, // Nombre de producto
  referencia: { type: String, required: true },     // Referencia
  precio: { type: Number, required: true },         // Precio (número entero)
  peso: { type: Number, required: true },           // Peso (número entero)
  categoria: { type: String, required: true },      // Categoría
  stock: { type: Number, required: true },          // Stock (cantidad en bodega)
  fechaCreacion: { type: Date, default: Date.now }, // Fecha de creación (fecha actual por defecto)
});

// Exportamos el modelo de producto
module.exports = mongoose.model('producto', ProductSchema);
