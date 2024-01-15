import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { MessageEntity } from "./message.entity";
import { TargetEntity } from "./target.entity";

@Entity()
export class MessageToTargetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => UserEntity,
        user => user.userId
    )
    userId: UserEntity;

    @ManyToOne(
        () => MessageEntity,
        message => message.messageId
    )
    messageId: MessageEntity;

    @ManyToOne(
        () => TargetEntity,
        target => target.targetId
    )
    targetId: TargetEntity;
}