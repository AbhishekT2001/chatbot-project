# RAG-Backend Chatbot Project

A premium, production-ready **Retrieval-Augmented Generation (RAG)** backend built with **NestJS**, **PostgreSQL** (using `pgvector`), and **Ollama**. This system allows you to chat with your own data by leveraging local LLMs and vector similarity search.

---

## 🚀 Features

*   **Fast Content Retrieval**: Optimized vector similarity search using PostgreSQL `pgvector`.
*   **Local LLM Integration**: Powered by **Ollama** (Mistral/Nomic-Embed-Text) for complete privacy and offline capability.
*   **Modular Architecture**: Built with NestJS for scalability and clean dependency injection.
*   **Configurable Environment**: Easy-to-manage environment variables for database and LLM endpoints.
*   **Full Privacy**: Your data never leaves your infrastructure.

---

## 🛠️ Tech Stack

*   **Framework**: [NestJS](https://nestjs.com/) (Node.js)
*   **Database**: [PostgreSQL](https://www.postgresql.org/) with [pgvector](https://github.com/pgvector/pgvector)
*   **AI/LLM Engine**: [Ollama](https://ollama.ai/)
*   **Language**: TypeScript

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   Node.js (v18 or higher)
*   PostgreSQL with the `pgvector` extension enabled
*   Ollama with `mistral` and `nomic-embed-text` models pulled
*   `nomic-embed-text` is used to embedding the text into vector semantics
*   `mistral` is the generative that generates answers

---

## ⚙️ Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/AbhishekT2001/chatbot-project.git
cd chatbot-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure your settings:
```env
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=chatbotDb

# Ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=mistral
OLLAMA_EMBEDDING=nomic-embed-text
```

### 4. Database Setup
Ensure your PostgreSQL database has the vector extension:
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(768) -- Vector size depends on the model (768 for nomic-embed-text)
);
```

---

## 🏃 Running the Project

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

---

## 🗺️ API Endpoints

### Post a Question
**`POST /chat`**
```json
{
  "question": "What is the summary of the documents?"
}
```

---

## 🏗️ Architecture

1.  **ChatController**: Handles incoming HTTP requests and extracts user questions.
2.  **EmbeddingService**: Interfaces with Ollama to convert text into high-dimensional vectors.
3.  **DatabaseService**: Manages the pooled connection to PostgreSQL and executes vector similarity queries.
4.  **RagService**: The orchestrator. It fetches embeddings, retrieves context from PG, builds a prompt, and generates the final answer using the LLM.

---

## 📄 License
This project is [UNLICENSED](LICENSE).

---

<p align="center">
  Made with ❤️ for Advanced Agentic Coding by Abhishek 😄
</p>
