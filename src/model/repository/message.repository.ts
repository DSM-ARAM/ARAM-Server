import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MessageEntity } from "../entity/message.entity";

@Injectable()
export class UserRepository {
    private messageRepository: Repository<MessageEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.messageRepository = this.dataSource.getRepository(MessageEntity);
    }
}