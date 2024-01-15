import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TargetEntity {
    @PrimaryGeneratedColumn()
    targetId: number;

    @Column()
    name: string;

    @Column()
    contact: string; // 전화번호

    @Column({
        type: "varchar"
    })
    status: Status

    @Column({
        type: "date"
    })
    birth: Date;
}