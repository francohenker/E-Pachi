import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producto])],
    providers: [ProductoService],
    controllers: [ProductoController],
    exports: [ProductoService],
})
export class ProductoModule {}
