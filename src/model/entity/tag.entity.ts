import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    tagId: number;

    @ManyToOne(
        () => UserEntity,
        user => user.userId
    )
    userId: UserEntity;

    @Column()
    tagName: string;

    @Column({
        default: false
    })
    isPublic: boolean;
}