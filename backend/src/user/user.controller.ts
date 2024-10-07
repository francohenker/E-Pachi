import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { RolesGuard } from 'src/guards/rol.guards';
import { Roles } from 'src/enums/roles.enum';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    @Get()
    async findAll(): Promise<any>{

    }

    //crea un nuevo usuario
    @Post('create')
    async create(@Body() User: CreateUserDto ): Promise<User>{
        return this.userService.create(User);
    }

    //actualiza el rol del usuario, solo los ADMINS pueden hacerlo
    @Put('update-rol')
    // @Roles(Roles.ADMIN)
    async updateRol(@Body() User: User): Promise<User>{
        return this.userService.updateRol(User);
    }

    //actualiza la contrasena del usuario
    @Put('update-password')
    async updatePassword (@Body() User: CreateUserDto): Promise<User>{
        return this.userService.updatePassword(User);
    }

    //actualiza el username y el email del usuario
    @Put('update-username')
    async updateUsername(@Body() User: CreateUserDto): Promise<User>{
        return this.userService.updateUsername(User);
    }

}
