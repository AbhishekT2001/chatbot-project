import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

//this service is used to connect to the database and run queries
@Injectable()
export class DatabaseService {
    private pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });

    async query(text: string, params?: any[]) {
        return this.pool.query(text, params);
    }
}
