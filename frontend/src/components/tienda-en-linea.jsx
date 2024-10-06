import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Heart, Home, Grid, User, Settings, Plus } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useNavigate } from 'react-router-dom';

export default function TiendaEnLineaJsx() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    calificacion: 0,
    stock: 10 // Puedes cambiar esto según tus requerimientos
  });
  const navigate = useNavigate();

  // Cargar productos desde localStorage
  const cargarProductos = () => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosGuardados);
  };

  // Guardar productos en localStorage
  const guardarProductos = (productosActualizados) => {
    localStorage.setItem('productos', JSON.stringify(productosActualizados));
  };

  // Cargar productos cuando el componente se monta
  useEffect(() => {
    cargarProductos();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const productoAAgregar = {
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio),
      calificacion: parseFloat(nuevoProducto.calificacion) || 0,
    };

    // Actualizar el estado y localStorage
    const nuevosProductos = [...productos, productoAAgregar];
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);

    // Resetear formulario
    setNuevoProducto({ nombre: '', precio: '', imagen: '', calificacion: 0 });
  };

  const marcarFueraDeStock = (id) => {
    const nuevosProductos = productos.map(producto =>
      producto.id === id ? { ...producto, stock: 0 } : producto
    );
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-navy-800"
                  onClick={() => navigate('/gestionar-productos')}
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Gestionar Productos
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-navy-800"
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Categorías
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-navy-800"
                >
                  <User className="mr-2 h-4 w-4" />
                  Mi Cuenta
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-navy-800"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="flex-1">
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-4 bg-navy-600 hover:bg-navy-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Vender
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nombre">Nombre del Producto</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={nuevoProducto.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      value={nuevoProducto.precio}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="imagen">URL de la Imagen</Label>
                    <Input
                      id="imagen"
                      name="imagen"
                      value={nuevoProducto.imagen}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit">Agregar Producto</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon" className="ml-4">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Carrito de compras</span>
            </Button>
          </div>
        </header>

        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-navy-900">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div key={producto.nombre} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Stock: {producto.stock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="icon" onClick={() => marcarFueraDeStock(producto.id)}>
                      Marcar fuera de stock
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
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
