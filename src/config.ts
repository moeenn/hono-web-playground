import { DatabaseConfig } from "./lib/database.js"

export class ServerConfig {
	constructor(
		public host = "localhost",
		public port = 8000,
	) { }

	getUrl(): string {
		return `${this.host}:${this.port}`
	}
}

export class Config {
	constructor(
		public db = new DatabaseConfig(),
		public server = new ServerConfig(),
	) { }
}
