import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    fileId: number;

    @Column()
    url: string;

    @ManyToOne(
        () => MessageEntity,
        (MessageEntity) => MessageEntity.messageId
    )
    messageId: MessageEntity
}