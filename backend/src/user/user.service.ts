import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepositity: Repository<User>,
    ) {}

    async create(user: CreateUserDto): Promise<User>{
        const oldUser = this.userRepositity.findOne({
            where: {
                username: user.username
            }}
        );

        if(oldUser){
            throw new InternalServerErrorException("User alredy exist");
        }

        const newUser = this.userRepositity.create(user);
        return await this.userRepositity.save(newUser);

    }

    async updateRol(user: User): Promise<User>{
        return await this.userRepositity.save(user);
    }

    async updatePassword(User: CreateUserDto): Promise<User>{
        return await this.userRepositity.save(User);
    }

    async updateUsername(User: CreateUserDto): Promise<User>{
        return await this.userRepositity.save(User);
    }

}
