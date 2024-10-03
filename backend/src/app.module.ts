import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoController } from './producto/producto.controller';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [ProductoModule],
  controllers: [AppController, ProductoController],
  providers: [AppService],
})
export class AppModule {}
