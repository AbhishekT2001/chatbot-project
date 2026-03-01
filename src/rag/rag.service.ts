import { Injectable } from "@nestjs/common";
import axios from "axios";
import { DatabaseService } from "../database/database.service";
import { EmbeddingService } from "../embeddings/embedding.service";

//this service is used to get the answer from the llm using the context
@Injectable()
export class RagService {
    //inject the database service and embedding service
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly embeddingService: EmbeddingService,
    ) { }

    //this function is used to get the answer from the llm using the context
    async ask(question: string) {
        //generate embedding from the text 
        const queryEmbedding = await this.embeddingService.getEmbedding(question);
        console.log(Array.isArray(queryEmbedding));
        console.log(queryEmbedding.length);
        const result = await this.databaseService.query(
            `select content From documents Order by embedding <-> $1 limit 5`,
            [`[${queryEmbedding.join(',')}]`]
        );

        //get the context from the result
        const context = result.rows.map(row => row.content).join('\n');

        //create the prompt
        const prompt = `
        use the following context to answer the question
        if the answer is not in the context, say that you don't know
        context : ${context}
        question : ${question}
        `

        //get the response from the llm
        const llmResponse = await axios.post(`${process.env.OLLAMA_URL}/api/generate`, {
            "model": "mistral",
            "prompt": prompt,
            "stream": false
        });

        return llmResponse.data.response
    }
}
