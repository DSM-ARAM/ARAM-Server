import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TargetEntity } from "../entity/target.entity";

@Injectable()
export class TargetRepository {
    private targetRepository: Repository<TargetEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.targetRepository = this.dataSource.getRepository(TargetEntity);
    }
}