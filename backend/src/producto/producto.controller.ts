import { Controller, Get, Patch, Param, Body, Post, NotFoundException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';

@Controller('productos')
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService
  ) {}

  // Ruta para obtener todos los productos
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  // Ruta para agregar un nuevo producto
  @Post()
  async createProducto(@Body() productoData: Partial<Producto>): Promise<Producto> {
    return this.productoService.create(productoData);
  }

  // Ruta para ajustar el stock de un producto
  @Patch(':id/ajustar-stock')
  ajustarStock(@Param('id') id: number, @Body('cantidad') cantidadVendida: number) {
    return this.productoService.ajustarStock(id, cantidadVendida);
  }

  // Ruta para marcar un producto como fuera de stock
  @Patch(':id/fuera-de-stock')
  marcarFueraDeStock(@Param('id') id: number) {
    return this.productoService.marcarFueraDeStock(id);
  }
}
