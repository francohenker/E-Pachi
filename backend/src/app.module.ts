import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.entity';
import { ProductoController } from './producto/producto.controller';
import { ProductoModule } from './producto/producto.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoService } from './producto/producto.service';

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
    TypeOrmModule.forFeature([User, Producto]),
    ProductoModule,
    UserModule
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService, ProductoService],
})
export class AppModule {}

