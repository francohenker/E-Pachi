import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoStock, setNuevoStock] = useState({});

  // Cargar productos desde localStorage
  const cargarProductos = () => {
    const productosDesdeStorage = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosDesdeStorage);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const ajustarStock = (id) => {
    if (nuevoStock[id] !== undefined) {
      console.log(`Ajustar stock del producto ID ${id} a ${nuevoStock[id]}`);
      setProductos(prevProductos =>
        prevProductos.map(producto =>
          producto.id === id ? { ...producto, stock: parseInt(nuevoStock[id]) } : producto
        )
      );
      setNuevoStock(prev => ({ ...prev, [id]: '' }));
      // Actualiza localStorage después de ajustar el stock
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  };

  const marcarFueraDeStock = (id) => {
    console.log(`Marcar producto ID ${id} como fuera de stock`);
    setProductos(prevProductos =>
      prevProductos.map(producto =>
        producto.id === id ? { ...producto, stock: 0 } : producto
      )
    );
    // Actualiza localStorage después de marcar como fuera de stock
    localStorage.setItem('productos', JSON.stringify(productos));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Productos</h1>
      <div className="space-y-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="mb-2">Stock disponible: {producto.stock}</p>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={nuevoStock[producto.id] || ''}
                onChange={(e) => setNuevoStock(prev => ({ ...prev, [producto.id]: e.target.value }))}
                placeholder="Nueva cantidad"
                className="w-1/3"
              />
              <Button onClick={() => ajustarStock(producto.id)} className="bg-blue-500 text-white">
                Ajustar Stock
              </Button>
              <Button onClick={() => marcarFueraDeStock(producto.id)} className="bg-red-500 text-white">
                Marcar como fuera de stock
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionarProductos;
