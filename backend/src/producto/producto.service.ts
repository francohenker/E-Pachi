import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) { }

  // Obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  // Agregar un nuevo producto
  async create(productoData: Partial<Producto>): Promise<Producto> {
    const nuevoProducto = this.productoRepository.create(productoData);
    return this.productoRepository.save(nuevoProducto);
  }

  // Ajustar el stock
  async ajustarStock(id: number, cantidadVendida: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (producto) {
      producto.stock -= cantidadVendida;

      if (producto.stock <= producto.stockThreshold) {
        // Notifica al vendedor para reponer inventario
        this.notificarVendedor(producto);
      }

      if (producto.stock <= 0) {
        producto.disponible = false;
      }

      return this.productoRepository.save(producto);
    }

    throw new NotFoundException('Producto no encontrado');
  }

  // Función privada para notificar al vendedor
  private notificarVendedor(producto: Producto) {
    // Aquí puedes implementar el código para notificar al vendedor via mail, notificaciones, etc.
    console.log(`Notificación: el stock del producto ${producto.nombre} está bajo.`);
  }

  // Marcar un producto como fuera de stock a mano
  async marcarFueraDeStock(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (producto) {
      producto.disponible = false;
      return this.productoRepository.save(producto);
    }

    throw new NotFoundException('Producto no encontrado');
  }
}
