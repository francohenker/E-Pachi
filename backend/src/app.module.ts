// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ProductoController } from './producto/producto.controller';
// import { ProductoModule } from './producto/producto.module';

// @Module({
//   imports: [ProductoModule],
//   controllers: [AppController, ProductoController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.entity';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgre', 
      password: 'postgre', 
      database: '', 
      entities: [Producto],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class AppModule {}

