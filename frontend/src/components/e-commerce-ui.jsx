'use client'

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Heart, Home, Grid, User, Settings } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TiendaEnLinea() {
  const [productos, setProductos] = useState([]);

  // función para cargar productos
  const cargarProductos = async () => {
    // aca se tiene que hacer una llamada a la base de datos pero como no tenemos se hace una simulacion nomas
    await new Promise(resolve => setTimeout(resolve, 1000));

    
    const nuevosProductos = [
      { id: 1, nombre: "Producto 1", precio: 1000, calificacion: 4.5, imagen: "URL_DE_LA_IMAGEN_1" },
      { id: 2, nombre: "Producto 2", precio: 2000, calificacion: 4.2, imagen: "URL_DE_LA_IMAGEN_2" },
    ];

    setProductos(nuevosProductos);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral vertical */}
      <aside className="w-64 bg-navy-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">TiendaAzul</h1>
          <nav>
            <ul className="space-y-4">
              <li>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-navy-800">
                  <Home className="mr-2 h-4 w-4" />
                  Inicio
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-navy-800">
                  <Grid className="mr-2 h-4 w-4" />
                  Categorías
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-navy-800">
                  <User className="mr-2 h-4 w-4" />
                  Mi Cuenta
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-navy-800">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* contenido Principal */}
      <main className="flex-1">
        {/* encabezado */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Button variant="outline" size="icon" className="ml-4">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Carrito de compras</span>
            </Button>
          </div>
        </header>

        {/* cuadrícula de Productos */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-navy-900">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-navy-900">{producto.nombre}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-navy-600">${producto.precio.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{producto.calificacion}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button className="w-full mr-2 bg-navy-600 hover:bg-navy-700 text-white">
                      Agregar al Carrito
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Agregar a favoritos</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}