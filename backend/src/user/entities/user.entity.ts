import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, } from 'typeorm'; 
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Roles } from 'src/enums/roles.enum';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true})
    username: string;
    
    @Column({unique : true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER,
    })
    rol: Roles;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compareSync(password, this.password);
    }

    @BeforeInsert()
    async hashPassword() {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

    


    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.rol = Roles.USER;
    }
}