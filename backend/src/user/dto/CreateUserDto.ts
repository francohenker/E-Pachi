import { IsNotEmpty } from "class-validator";
import { Roles } from "src/enums/roles.enum";


export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    rol: Roles;

    constructor(username: string, email: string, password: string, rol: Roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

}