import { Controller, Get } from '@nestjs/common';
import { promises } from 'dns';
import { Producto } from './entities/producto.entity';

@Controller('product')
export class ProductoController {

    constructor(){}

    @Get()
    async findAll(): Promise<Producto[]>{
        return 
    }
    




}
