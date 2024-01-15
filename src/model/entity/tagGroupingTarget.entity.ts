import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TargetEntity } from "./target.entity";
import { TagEntity } from "./tag.entity";

@Entity()
export class TagGroupingTargetEntity {
    @PrimaryGeneratedColumn()
    tagGroupingTargetId: number

    @ManyToOne(
        () => TargetEntity,
        target => target.targetId
    )
    targetId: TargetEntity;

    @ManyToOne(
        () => TagEntity,
        tag => tag.tagId
    )
    tagId: TagEntity;
}