import { Module } from "@nestjs/common";
import { ChatController } from "./chat/chat.controller";
import { DatabaseService } from "./database/database.service";
import { EmbeddingService } from "./embeddings/embedding.service";
import { RagService } from "./rag/rag.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [ChatController],
    providers: [DatabaseService, EmbeddingService, RagService],
})
export class AppModule { }
