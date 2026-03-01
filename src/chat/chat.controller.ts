import { Controller, Post, Body } from "@nestjs/common";
import { RagService } from "../rag/rag.service";

@Controller('chat')
export class ChatController {
    constructor(
        private readonly ragService: RagService,
    ) { }

    @Post()
    async chat(@Body() body: { question: string }) {
        return this.ragService.ask(body.question);
    }
}
