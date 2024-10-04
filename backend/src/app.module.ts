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
import { ProductoModule } from './producto/producto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/entities/producto.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'e-pachi',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Producto, User],
    }),
    ProductoModule,
    UserModule
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService],
})
export class AppModule {}

