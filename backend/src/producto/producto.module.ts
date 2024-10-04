import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity'; 
import { ProductoService } from './producto.service'; 
import { ProductoController } from './producto.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // aca va mi entidad
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
