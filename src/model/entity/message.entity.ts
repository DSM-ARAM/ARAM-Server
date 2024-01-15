import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    messageId: number;

    @Column()
    head: string;

    @Column({
        type: 'text'
    })
    body: string;

    @Column({
        type: 'date'
    })
    date: Date;
}