import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export class User extends BaseEntity{

    //Auto increment id
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50
    })
    user: string

    @Column({
        length: 100
    })
    name: string

    @Column({
        length: 255
    })
    pass: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


}