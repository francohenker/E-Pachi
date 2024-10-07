import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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

    @Column({ default: 0 })
    stockThreshold: number; // umbral definido por el vendedor
  
    @Column({ default: true })
    disponible: boolean; // indica si está disponible o no

    constructor(){
        
    }
}
