import { DatabaseConfig } from "./lib/database.js"

export class ServerConfig {
    host: string
    port: number

    constructor(host = "localhost", port = 3000) {
        this.host = host
        this.port = port
    }

    getUrl(): string {
        return `${this.host}:${this.port}`
    }
}

export class Config {
    db: DatabaseConfig
    server: ServerConfig

    constructor() {
        this.db = new DatabaseConfig()
        this.server = new ServerConfig()
    }
}
