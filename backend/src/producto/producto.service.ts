// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Producto } from './entities/producto.entity';

// @Injectable()
// export class ProductoService {
//     constructor(
//         @InjectRepository(Producto)
//         private productoRepository: Repository<Producto>,
//     ){}

//     async findAll(): Promise<Producto[]>{
//         return await this.productoRepository.find();
//     }

// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  //  obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  // para ajustar el stock
  async ajustarStock(id: number, cantidadVendida: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (producto) {
      producto.stock -= cantidadVendida;

      if (producto.stock <= producto.stockThreshold) {
        // notifica al vendedor para reponer inventario
        this.notificarVendedor(producto);
      }

      if (producto.stock <= 0) {
        producto.disponible = false;
      }

      return this.productoRepository.save(producto);
    }

    throw new NotFoundException('Producto no encontrado');
  }

  // función privada para notificar al vendedor
  private notificarVendedor(producto: Producto) {
    // aca tiene que ir todo el codigo para notificar al vendedor via mail,notificaciones o lo que sea
    console.log(`Notificación: el stock del producto ${producto.nombre} está bajo.`);
  }

  // función para marcar un producto como fuera de stock a mano
  async marcarFueraDeStock(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (producto) {
      producto.disponible = false;
      return this.productoRepository.save(producto);
    }

    throw new NotFoundException('Producto no encontrado');
  }
}
