import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TagEntity } from "../entity/tag.entity";

@Injectable()
export class UserRepository {
    private tagRepository: Repository<TagEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.tagRepository = this.dataSource.getRepository(TagEntity);
    }
}