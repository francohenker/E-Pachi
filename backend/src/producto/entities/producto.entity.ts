import {Column, Double, Entity, IntegerType, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string
    
    @Column()
    descripcion: string
    
    @Column({type: 'float'})
    precio: number
    
    @Column({type: 'int'})
    stock: number
    
    @Column({type: 'date'})
    fecha_creacion: Date

    constructor(){
        
    }
}
