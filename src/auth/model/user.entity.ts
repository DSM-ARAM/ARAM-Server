import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    userId: number

    @Column({
        type: 'varchar',
        unique: true
    })
    userName: string

    @Column({
        type: 'varchar',
        unique: true
    })
    userEmail: string

    @Column({
        type: 'varchar',
    })
    userDepartment: string

    @Column({
        type: 'varchar',
    })
    userPassword: string
}