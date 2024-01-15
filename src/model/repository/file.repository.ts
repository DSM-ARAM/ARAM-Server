import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FileEntity } from "../entity/file.entity";

@Injectable()
export class UserRepository {
    private fileRepository: Repository<FileEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.fileRepository = this.dataSource.getRepository(FileEntity);
    }
}