import { Database, DatabaseConfig } from "src/lib/database.js"
import { UserRepo } from "#src/database/repos.js"
import { entrypoint } from "../lib/entrypoint.js"

function main(): void {
    const config = new DatabaseConfig()
    const db = new Database(config)

    const userRepo = new UserRepo(db)
    const user = userRepo.list()
    console.log(user)
}

entrypoint(main)
