const express = require('express');
const router = express.Router();
const Product = require('./models/producto');
const Venta = require('./models/venta');

// Ruta para listar todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Product.find(); // Buscamos todos los productos
    res.json(productos); // Devolvemos los productos en formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Si ocurre un error, lo manejamos
  }
});

// Ruta para crear un nuevo producto
router.post('/productos', async (req, res) => {
  const { nombreProducto, referencia, precio, peso, categoria, stock } = req.body;

  // Validación de campos obligatorios
  if (!nombreProducto || !referencia || !precio || !peso || !categoria || !stock) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Creamos un nuevo producto con los datos enviados
  const producto = new Product({
    nombreProducto,
    referencia,
    precio,
    peso,
    categoria,
    stock,
  });

  try {
    const nuevoProducto = await producto.save(); // Guardamos el producto en la base de datos
    res.status(200).json(nuevoProducto); // Devolvemos el producto recién creado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Si ocurre un error, lo manejamos
  }
});

// Ruta para editar un producto
router.put('/productos/:id', async (req, res) => {
  try {
    // Buscamos y actualizamos el producto por su ID
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto); // Devolvemos el producto actualizado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Si ocurre un error, lo manejamos
  }
});


router.get('/productos/:id', async (req, res) => {
    try {
      // Buscamos y actualizamos el producto por su ID
      const producto = await Product.findByIdAndUpdate(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(producto); // Devolvemos el producto actualizado
    } catch (error) {
      res.status(400).json({ message: error.message }); // Si ocurre un error, lo manejamos
    }
  });

// Ruta para eliminar un producto
router.delete('/productos/:id', async (req, res) => {
  try {
    // Buscamos y eliminamos el producto por su ID
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' }); // Devolvemos un mensaje de éxito
  } catch (error) {
    res.status(500).json({ message: error.message }); // Si ocurre un error, lo manejamos
  }
});

router.post('/ventas', async (req, res) => {
    const { productId, quantitySold } = req.body;
  
    try {
      // Buscar el producto
      const producto = await Product.findById(productId);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Verificar si hay suficiente stock
      if (producto.stock < quantitySold) {
        return res.status(400).json({ message: 'No hay suficiente stock disponible' });
      }
  
      // Restar la cantidad vendida del stock
      producto.stock -= quantitySold;
      await producto.save(); // Guardar el producto actualizado
  
      // Registrar la venta (puedes crear un modelo de ventas similar al de productos)
      const venta = new Venta({
        productId: producto._id,
        productName: producto.nombreProducto,
        quantitySold,
        date: new Date(),
      });

      const nuevaVenta = await venta.save();
  
      // Aquí puedes guardar la venta en una base de datos de ventas si lo deseas
  
      res.status(200).json(nuevaVenta); // Devolvemos la venta realizada
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/ventas', async (req, res) => {
    try {
        const ventas = await Venta.find(); // Buscamos todos los productos
        res.json(ventas); // Devolvemos los productos en formato JSON
      } catch (error) {
        res.status(500).json({ message: error.message }); // Si ocurre un error, lo manejamos
      }
});

module.exports = router;
