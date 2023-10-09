import express, { json } from 'express';
import { v4 } from 'uuid';

const app = express();
app.use(json());

// Datos de ejemplo: carrito de compras
let carrito = [];

// Ruta para ver los productos en el carrito
app.get('/carrito', (req, res) => {
  res.json(carrito);
});

// Ruta para agregar un producto al carrito
app.post('/carrito/agregar', (req, res) => {
  const producto = {
    id: v4(),
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad || 1,
  };

  carrito.push(producto);
  res.status(201).json(producto);
});

// Ruta para actualizar la cantidad de un producto en el carrito
app.put('/carrito/:id', (req, res) => {
  const id = req.params.id;
  const cantidad = req.body.cantidad;

  const producto = carrito.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
  }

  producto.cantidad = cantidad;
  res.json(producto);
});

// Ruta para eliminar un producto del carrito
app.delete('/carrito/:id', (req, res) => {
  const id = req.params.id;

  const productoIdx = carrito.findIndex((p) => p.id === id);

  if (productoIdx === -1) {
    return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
  }

  const productoEliminado = carrito.splice(productoIdx, 1)[0];
  res.json(productoEliminado);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});