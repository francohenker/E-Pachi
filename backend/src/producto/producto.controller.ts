import { Controller, Get, Patch, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService
  ) {}

  // ruta para obtener todos los productos
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  // ruta para ajustar el stock de un producto
  @Patch(':id/ajustar-stock')
  ajustarStock(@Param('id') id: number, @Body('cantidad') cantidadVendida: number) {
    return this.productoService.ajustarStock(id, cantidadVendida);
  }

  // ruta para marcar un producto como fuera de stock
  @Patch(':id/fuera-de-stock')
  marcarFueraDeStock(@Param('id') id: number) {
    return this.productoService.marcarFueraDeStock(id);
  }
}
