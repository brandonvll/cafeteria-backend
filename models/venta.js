
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', // Relaciona con el modelo de Producto
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantitySold: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Venta', ventaSchema);
