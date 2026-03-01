import axios from "axios";
import { Injectable } from "@nestjs/common";

//this service is used to get the embeddings of the text using ollama
@Injectable()
export class EmbeddingService {
    async getEmbedding(text: string) {
        const response = await axios.post(`${process.env.OLLAMA_URL}/api/embeddings`, {
            model: `${process.env.OLLAMA_EMBEDDING}`,
            prompt: text
        });
        return response.data.embedding;
    }
}
